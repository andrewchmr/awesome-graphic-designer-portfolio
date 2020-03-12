const {Schema, model} = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {type: String, required: true},
    thumbnail: {type: String, required: true},
    color: {type: String, required: true},
    category: {type: String, required: true}
});

module.exports = model('Work', schema);