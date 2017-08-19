var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');

module.exports = {
    index: (req, res) => {
        if(!req.session.user_id) {
            res.redirect('/login');
        } else {
            res.render('index')
        }
    },
    register: (req, res) => {
        res.render('register');
    },
    create: (req, res) => {
        var newUser = {
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
        }
        console.log('*** ', newUser);
        if (req.body.password == req.body.confirm_pw) {
            let hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
            newUser['password'] = hash;
            User.create(newUser, (err, newUser) => {
                if (err) {
                    console.log(err);
                    newUser.password = null;
                    req.session.reg_data = newUser;
                    req.redirect('/register')
                } else {
                    req.session.user_id = newUser._id;
                    res.redirect('/');
                }
            })
        } else {
            console.log(req.body.password + ' Did not Equal ' + req.body.confirm_pw);
            req.session.reg_data = newUser;
            res.redirect('/register')
        }
    },
    login: (req, res) => {
        if(!req.session.user_id) {
            res.render('login');
        } else {
            res.redirect('/');
        }
    },
    auth: (req, res) => {
        if (!req.body.email || !req.body.password) {
            console.log('Verify Email and Password Fields are not Empty!');
            res.redirect('/login');
        } else {
            console.log(req.body);
            let check_email = req.body.email;
            let check_password = req.body.password;
            User.findOne({email: check_email}, (err, userInfo) => {
                if (err) {
                    console.log(err);
                    res.redirect('/login');
                } else {
                    console.log(userInfo);
                    let user_hash = userInfo.password;
                    if (bcrypt.compareSync(check_password, user_hash)) {
                        let user = {
                            fName: userInfo.fName,
                            lName: userInfo.lName,
                            email: userInfo.email
                        }
                        res.render('index', { user: user });
                    } else {
                        console.log(err);
                        res.redirect('/login');
                    }
                }
            });
        }
    },
    logout: (req, res) => {

    }
}
