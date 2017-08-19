var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');

module.exports = {
    index: (req, res) => {
        if(!req.session.user) {
            let response = {
                error: 'No Current User',
                status: false
            }
            res.json(response);
        } else {
            let response = {
                error: '',
                status: true,
                data: req.session.user,
                users: []
            }
            User.find({}, ( err, allUsers ) => {
                if (err) {
                    console.log(err);
                } else {
                    response.users = allUsers;
                    res.json(response)
                }
            });
        }
    },
    create: (req, res) => {
        let newUser = {
            email: req.body.email,
        }
        if (req.body.password == req.body.confirm_pw) {
            let hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
            newUser['password'] = hash;
            User.create(newUser, (err, newUser) => {
                if (err) {
                    newUser.password = null;
                    let data = {
                        error: 'There was an issue with Creating the User.',
                        submitted_info: newUser
                    }
                    res.json(data)
                } else {
                    newUser.password = null;
                    req.session.user = newUser
                    res.json(newUser);
                }
            })
        } else {
            let data = {
                errors: 'Password does not match',
                submitted_info: newUser
            }
            res.json(data)
        }
    },
    auth: (req, res) => {
        if (!req.body.email || !req.body.password) {
            console.log('Verify Email and Password Fields are not Empty!');
            res.json(false);
        } else {
            let check_email = req.body.email;
            let check_password = req.body.password;
            User.findOne({email: check_email}, (err, userInfo) => {
                if (err) {
                    console.log(err);
                    res.json(false);
                } else {
                    let user_hash = userInfo.password;
                    if (bcrypt.compareSync(check_password, user_hash)) {
                        userInfo.password = null;
                        req.session.user = userInfo;
                        res.json(userInfo);
                    } else {
                        console.log(err);
                        res.json(false);
                    }
                }
            });
        }
    },
    checkAuth: (req, res) => {
        if(!req.session.user) {
            let response = {
                error: 'No Current User',
                status: false
            }
            res.json(response);
        } else {
            let response = {
                error: '',
                data: req.session.user,
                status: true
            }
            res.json(response);
        }
    },
    logout: (req, res) => {
        console.log('Log Out');
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.json(true)
            }
        })
    }
}
