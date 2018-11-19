const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt');


let login = (body,callback)=>{
    User.findOne({username: body.username}, function (error, user) {
        if (error) {
            callback({status: 500, auth: false, error: "An error occurred."});
        } else if (!user) {
            callback({status: 500, auth: false, error: "Incorrect username or password."});

        } else {
            bcrypt.compare(body.password, user.password, function (err, res) {
                if (!res) {
                    callback({status: 500, auth: false, error: "Incorrect username or password."});
                } else {
                    body.session = {
                        username:res.username,
                    };
                    //var token = jwt.sign({"_id": user._id}, jwtConfig.secret, {expiresIn: 604800}); //Token com tempo de expiração 7 dias.
                    callback({status: 200, auth: true});
                }
            });
        }
    });
};
let insert =  (req, callback) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const verified = jwtConfig.verifyJWT(req);

    if (verified.auth) {
        if (username && password && confirmPassword) {
            if (password === confirmPassword) {
                User.findOne({'username': username}, function (AuthUser) {
                    if (AuthUser) {
                        callback({success: false, error: 'Username already in use'});
                    } else {
                        bcrypt.hash(password.toString(), null, null, function (err, hash) {
                            if (err) {
                                callback({success: false, error: err});
                            } else {
                                new User({
                                    'username': req.body.username,
                                    'password': hash
                                }).save(function (error, user) {
                                    if (error) {
                                        callback({error: 'Cannot create user.'});
                                    } else {
                                        callback(user);
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                callback({success: false, error: 'Password and confirmation does not match.'});
            }
        } else {
            callback({success: false, error: 'Invalid user or password.'});
        }
    }else{
        callback({success: false, error: 'User not authenticated'});
    }

};

exports.getAll = function (callback) {
    User.find({}, function (error, user) {
        if (error) {
            callback({error: 'No Users Found.'});
        } else {
            callback(user);
        }
    });
};

exports.update = function (userId, body, callback) {
    User.findById(userId, body, function (error, user) {
        if (error) {
            callback({error: 'No users found with the specified id.'})
        } else {
            bcrypt.compare(body.currentPassword, user.password, function (err, res) {
                if (!res) {
                    callback({success: false, error: "Passwords should match."});
                } else {
                    bcrypt.hash(body.password.toString(), null, null, function (err, hash) {
                        if (err) {
                            callback({success: false, error: err});
                        } else {
                            User.update({}, {
                                'username': body.username,
                                'password': hash
                            }, function (error, userUpdated) {
                                if (error) {
                                    callback({success: false, error: 'Cannot update user.'});
                                } else {
                                    callback(userUpdated);
                                }
                            });

                        }
                    });
                }
            });
            /*
            bcrypt.compare(body.currentPassword, user.password, function (err, res) {
                if (err) {
                    callback({success: false, error: "Passwords should match."});
                } else {

                    bcrypt.hash(body.password.toString(), null, null, function (err, hash) {
                        if (err) {
                            callback({success: false, error: err});
                        } else {
                            user.updateOne({}, {
                                'username': body.username,
                                'password': hash
                            }, function (error, user) {
                                if (error) {
                                    callback({success: false, error: 'Cannot update user.'});
                                } else {
                                    callback(user);
                                }
                            });

                        }
                    });
                }
            });
*/
        }
    });
};

let deleted = (userId, callback) =>{
    User.findById(userId, function (error, user) {
        if (error) {
            callback({error: 'No user information found with the specified id.'})
        } else {
            user.remove(function (error) {
                if (!error) {
                    callback({resposta: 'User information deleted successfully.'})
                }
            });
        }
    })
};

exports = module.exports = {
    login:login,
    insert:insert,
    delete:deleted

};