const User = require('../database/User.js');

exports.checkUsernameAndEmail = (req, res, next) => {
    
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Falha! nome de usuário já cadastrado!" });
            return;
        }

        // Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Falha, email já em uso!" });
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