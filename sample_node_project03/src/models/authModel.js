const User = require('../database/User.js');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");

exports.signup = (req, res) => {

    const user = new User({

        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)

    });

    user.save(err => {

        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({ message: "Usuário cadastrado com sucesso!" });
    
    });

}; // end signup

exports.signin = (req, res) => {
    
    User.findOne({

        username: req.body.loginUsername

    }).exec((err, user) => {

            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "Usuário não encontrado!" });
            }

            var isValidPassword = bcrypt.compareSync(
                req.body.loginPassword,
                user.password
            );

            if (!isValidPassword) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Senha inválida!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.set('x-access-token', token);

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                accessToken: token
            });

        });

}; // end signin