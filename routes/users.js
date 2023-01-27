var express = require('express');
const User = require("../models/user");
const Dish = require("../models/dish");
const {authenticateToken} = require("../authenticateToken");
var router = express.Router();

/* GET users listing. */

router.get('/', authenticateToken ,async function(req, res, next) {
    const user = await User.findById(req.userID).populate('orders.dishes.dish');
    // const user = await User.findById(req.userID).populate({
    //     path : 'userId',
    //     populate : {
    //         path : 'reviewId'
    //     }
    // })
    // user.password = undefined;

    console.log('useruser',user);

    res.json(user);
});

router.get('/all', authenticateToken, async function(req, res, next) {

    const user = await User.findById(req.userID);

    if(user.role !== 'admin') {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }

    const users = await User.find();
    res.json(users);
});



router.post('/neworder',authenticateToken, async function (req, res) {
    console.log(req.body);
    if(!req.body.order){
        res.status(400).json({message: "No order provided"});
        return;
    }

    const user = await User.findById(req.userID);
    const order = req.body.order;

    user.orders.push(order);
    req.body.order.user = user._id;
    user.save();
    console.log("jesuuuuu",order)

    order.dishes.forEach(item => {

        Dish.findById(item.dish).then(dish => {
            console.log("halo?",dish);
            dish.quantity -= item.quantity;
            dish.save();
        })
    });

    res.status(201).json({message: "Order added"});
});


router.put('/:id', authenticateToken,async function(req, res, next) {
    const user = await User.findById(req.params.id);
    console.log("Cos",req.body);
    if (req.body.username) {
        user.username = req.body.username;
    }
    if (req.body.password) {
        user.password = req.body.password;
    }
    if (req.body.email) {
        user.email = req.body.email;
    }
    if(req.body.orders) {
        user.orders = req.body.orders;

    }
    if(req.body.cart) {
        user.cart = req.body.cart;
    }
    if(req.body.role){
        user.role = req.body.role;
    }
    if(req.body.banned){
        user.banned = req.body.banned;
    }
    try {
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
