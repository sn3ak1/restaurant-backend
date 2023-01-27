const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
    },
    cart: {
        type: [{
            dish: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dish',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            },
        }],
        required: false,
        default: [],
    },
    orders: {
        type: [{
            dishes: {
                type: [{
                    dish: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Dish',
                        required: true,
                    },
                    quantity: {

                        type: Number,
                        required: true,
                        min: 1,
                        default: 1,
                    },
                }],
                required: true,
                default: [],
            },
            total: {
                type: Number,
                required: true,
                min: 0,
                default: 0,
            },
            date: {
                type: Date,
                required: true,
                default: Date.now,
            },
        }],
        required: false,
        default: [],
    },
    banned: {
        type: Boolean,
        required: true,
        default: false,
    }
});

module.exports = mongoose.model('User', userSchema);
