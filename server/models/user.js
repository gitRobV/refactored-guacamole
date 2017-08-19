var mongoose    = require('mongoose');

// Ninja Model/Schema
var UserSchema = new mongoose.Schema({
    // fName: {
    //     type: String,
    //     required: true,
    //     minlength: 2,
    //     maxlength: 36
    // },
    // lName: {
    //     type: String,
    //     required: true,
    //     minlength: 2,
    //     maxlength: 36
    // },
    // username: {
    //     type: String,
    //     required: true,
    //     minlength: 8,
    //     maxlength: 36,
    //     unique: true
    // },
    email: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 36,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
},{ timestamps: true });

mongoose.model('User', UserSchema);
