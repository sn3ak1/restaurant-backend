const mongoose = require('mongoose');
const Comment = require('./comment');

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    images: {
        type: [String],
        required: true,
        default: [],
    },
    cuisine: {
        type: String,
        required: true,
        default: 'Other',
    },
    category: {
        type: String,
        required: true,
        default: 'Other',
    },
    type: {
        type: String,
        required: true,
        default: 'Other',
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000,
        trim: true,
        default: 'No description provided',
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    comments: {
        type: [Comment.schema],
        required: false
    },
    ingredients: {
        type: [String],
        required: true,
        minlength: 1,
        maxlength: 100,
        trim: true,
        default: ['No ingredients provided'],
    },
});

module.exports = mongoose.model('Dish', dishSchema);



