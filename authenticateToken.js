const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    console.log(req.headers);
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    const token = authHeader //&& authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)
        req.userID = user._id
        next()
    })
}

module.exports = {authenticateToken}
