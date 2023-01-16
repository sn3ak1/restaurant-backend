const express = require('express')
const router = express.Router()
const Dish = require('../models/dish')

// Getting all
router.get('/', async (req, res) => {
    const params = req.query;
    const query = {};
    if (params.name) {
        query.name = {
            $regex: params.name,
            $options: 'i'
        }
    }

    if (params.cuisine) {
        console.log(params.cuisine);
        console.log(params.cuisine);
        query.cuisine = params.cuisine
    }

    try {
        const dishes = await Dish.find(query)
        res.json(dishes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getDish, (req, res) => {
    res.json(res.dish)
})

// Creating one
router.post('/', async (req, res) => {
    const dish = new Dish({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        images: req.body.images,
        cuisine: req.body.cuisine,
        category: req.body.category,
        type: req.body.type,
        ingredients: req.body.ingredients,
    })
    try {
        const newDish = await dish.save()
        res.status(201).json(newDish)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getDish, async (req, res) => {
    if (req.body.name != null) {
        res.dish.name = req.body.name
    }
    if (req.body.description != null) {
        res.dish.description = req.body.description
    }
    if (req.body.price != null) {
        res.dish.price = req.body.price
    }
    if (req.body.quantity != null) {
        res.dish.quantity = req.body.quantity
    }
    if (req.body.images != null) {
        res.dish.images = req.body.images
    }
    if (req.body.cuisine != null) {
        res.dish.cuisine = req.body.cuisine
    }
    if (req.body.category != null) {
        res.dish.category = req.body.category
    }
    if (req.body.type != null) {
        res.dish.type = req.body.type
    }
    if (req.body.ingredients != null) {
        res.dish.ingredients = req.body.ingredients
    }
    if (req.body.comments != null) {
        res.dish.comments = req.body.comments
    }
    try {
        const updatedDish = await res.dish.save()
        res.json(updatedDish)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.put('/:id', getDish, async (req, res) => {
    res.dish.name = req.body.name
    res.dish.description = req.body.description
    res.dish.price = req.body.price
    res.dish.quantity = req.body.quantity
    res.dish.images = req.body.images
    res.dish.cuisine = req.body.cuisine
    res.dish.category = req.body.category
    res.dish.type = req.body.type
    res.dish.ingredients = req.body.ingredients
    res.dish.comments = req.body.comments
    try {
        const updatedDish = await res.dish.save()
        res.json(updatedDish)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getDish, async (req, res) => {
    try {
        await res.dish.remove()
        res.json({ message: 'Deleted dish' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getDish(req, res, next) {
    let dish
    try {
        dish = await Dish.findById(req.params.id)
        if (dish == null) {
            return res.status(404).json({ message: 'Cannot find dish' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.dish = dish
    next()
}

module.exports = router
