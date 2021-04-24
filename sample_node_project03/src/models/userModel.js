const User = require('../database/User.js');

exports.checkUsernameAndEmail = (req, res, next, callback) => {
    
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            callback(null, err, null);
            return;
        }

        if (user) {
            callback(user);
            return;
        }

        // Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            
            if (err) {
                callback(null, err, null);
                return;
            }

            if (user) {
                callback(null, null, user);
                return;
            }

            next();

        });
    });

} // end checkUsernameAndEmail

exports.isValidUser = (req, res, next) => {

    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if(user) {
            next();
            return;
        }

        res.status(403).send({ message: "Usuário não encontrado!" });
        return;
        
    });

}