var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken')
const User = require("../models/user");
const bcrypt = require("bcrypt");

let refreshTokens = []

router.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name, _id: user._id })
        res.json({ accessToken: accessToken })
    })
})

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

router.post('/login', async function (req, res) {
    // Authenticate User
    console.log(req.body);
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({ username: username});
    bcrypt.compare(password, user.password, function(err, result) {
        console.log(result, password, user.password);
        if (err) {
            res.status(500).json({ message: err.message })
        }
        if (result) {
            const user_ = { username: username,_id: user._id }
            const accessToken = generateAccessToken(user_)
            const refreshToken = jwt.sign(user_, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)
            res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken })

        }
        else{
            res.sendStatus(401)

        }});

})
router.post('/register', async function (req, res) {
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password,10),
        email: req.body.email
    })
    try {
        // console.log(newUser)
        const newUser = await user.save()
        const username = req.body.username
        const user_ = { username: username,_id: newUser._id }
        const accessToken = generateAccessToken(user_)
        const refreshToken = jwt.sign(user_, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
        res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }

})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
}

module.exports = router;
