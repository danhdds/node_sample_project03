const jwt = require('jsonwebtoken');
const config = require('../config/authConfig.js');
userModel = require('../models/userModel.js');

verifyToken = (req, res, next) => {

    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "Sem token!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Não autorizado!" });
        }
        req.userId = decoded.id;
        next();
    });

};

isUser = (req, res, next) => {
    userModel.isValidUser(req, res, next);
};

const authJwt = {
    verifyToken,
    isUser
};

module.exports = authJwt;