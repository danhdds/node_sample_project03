const authModel = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");

exports.singUpNewUserController = (req, res) => {

    authModel.signup(req, res, function (err, saved) {

        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (saved) {
            res.send({ message: "Usuário cadastrado com sucesso!" });
            return;
        }

    });


} // end createNewUser

exports.signinUserController = (req, res) => {

    authModel.signin(req, res, function (err, user) {

        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            res.status(404).send({ message: "Usuário não encontrado!" });
            return;
        } 

        if(user){

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
        }

    });


} // end signinUserController