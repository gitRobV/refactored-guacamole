var mongoose    = require('mongoose');

// Ninja Model/Schema
var NinjaSchema = new mongoose.Schema({
    name: String,
    fav_stack: String,
    belt_count: Number
});

module.exports = mongoose.model('Ninja', NinjaSchema);
