const User = require('../database/User.js');
const bcrypt = require('bcryptjs');


exports.signup = (req, res, callback) => {

    const user = new User({

        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)

    });

    user.save(err => {

        if (err) {
            callback(err, false);
            return;
        }
        
        callback(null, true);
    
    });

}; // end signup

exports.signin = (req, res, callback) => {
    
    User.findOne({

        username: req.body.loginUsername

    }).exec((err, user) => {

            if (err) {
                callback(err, null);
                return;
            }

            if (!user) {
                callback(null, user);
                return;
            }

            callback(null, user);
            return;

        });

}; // end signin