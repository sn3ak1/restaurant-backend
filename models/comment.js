const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
{
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: false,
        minlength: 50,
        maxlength: 500,
    }
}
);

module.exports = mongoose.model('Comment', commentSchema);

