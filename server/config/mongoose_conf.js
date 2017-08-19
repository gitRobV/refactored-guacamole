var mongoose    = require('mongoose');
// Mongo DB connect
mongoose.connect('mongodb://localhost/black-belt');
require('../models/user.js')
