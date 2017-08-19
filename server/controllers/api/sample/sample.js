var mongoose = require('mongoose');
var Ninja = mongoose.model('Ninja');

module.exports = {
    index: function (req, res) {
        Ninja.find({}, function(err, ninjas) {
            if (err) {
                console.log(err);
            } else {
                res.render('index', {ninjas: ninjas});
            }
        });
    },
    new: function (req, res) {
        res.render('ninja_form', {sel_ninja: new Ninja(), action: "/new"});
    },
    create: function (req, res) {
        var newNinja = {
            name: req.body.name,
            fav_stack: req.body.fav_stack,
            belt_count: req.body.belt_count
        };
        Ninja.create(newNinja, function(err, newUser) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        })
    },
    show: function (req, res) {
        Ninja.findOne({_id: req.params.id}, function (err, ninja) {
            if (err) {
                console.log(err);
            } else {
                res.render('show', {ninja: ninja})
            }
        })
    },
    edit: function (req, res) {
        Ninja.findOne({_id: req.params.id}, function (err, ninja) {
            if (err) {
                console.log(err);
            } else {
                res.render('ninja_form', {sel_ninja: ninja, action: "/edit"});
            }
        });
    },
    update: function (req, res) {
        ninja = {
            name: req.body.name,
            fav_stack: req.body.fav_stack,
            belt_count: req.body.belt_count
        };
        Ninja.findByIdAndUpdate(req.params.id, ninja, function (err, updatedNinja) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/ninja/' + req.params.id)
            }
        });
    },
    destroy: function (req, res) {
        Ninja.findOneAndRemove({_id: req.params.id}, function (err, removedNinja) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        })
    }
}
