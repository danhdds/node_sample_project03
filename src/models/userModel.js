const User = require('../database/User.js');
const bcrypt = require('bcryptjs');

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

exports.checkUsername = (req, res, callback)=> {

    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            callback(null, err, false);
            return;
        }

        if (user) {
            callback(user, null, false);
            return;
        }else{
            callback(null, null, true);
            return;
        }
    });    

} // checkUsername

exports.checkEmail = (req, res, callback) => {
    
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {

        if (err) {
            callback(null, err, false);
            return;
        }

        if (user) {
            callback(user, null, false);
            return;
        }else{
            callback(null, null, true);
            return;
        }

    });

} // checkEmail

exports.isValidUser = (req, res, next) => {

    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            next();
            return;
        }

        res.status(403).send({ message: "Usuário não encontrado!" });
        return;

    });

} // end isValidUser

exports.updateUserDetails = (req, res, callback) => {

    let update = {};

    if (req.body.password == "") {

        update = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email
        };

    } else {

        update = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        };

    } // end if else

    User.findByIdAndUpdate(req.body.id, update, function (err, result) {
        if (err) {
            callback(err, null);
            //console.log(err);
        } else {
            callback(null, result);
            //console.log(result);
        }
    });

} // end updateUserDetails

exports.addCharacterToFavorites = (req, res, callback) => {

    update = {
        $push: { characters: req.body.character }
    };

    User.findByIdAndUpdate(req.body.id, update, function (err, result) {
        if (err) {
            callback(err, null);
            //console.log(err);
        } else {
            callback(null, result);
            //console.log(result);
        }
    });

}

exports.addComicToFavorites = (req, res, callback) => {

    update = {
        $push: { comics: req.body.comic }
    };

    User.findByIdAndUpdate(req.body.id, update, function (err, result) {
        if (err) {
            callback(err, null);
            //console.log(err);
        } else {
            callback(null, result);
            //console.log(result);
        }
    });

}

exports.getFavoriteCharacters = (req, res, callback) => {

    User.findById(req.body.id).exec((err, user) => {
        if (err) {
            callback(err, null);
            return;
        }

        if (user) {
            callback(null, user.characters);
            return;
        }

    });

} // end getFavoriteCharacters

exports.getFavoriteComics = (req, res, callback) => {

    User.findById(req.body.id).exec((err, user) => {
        if (err) {
            callback(err, null);
            return;
        }

        if (user) {
            callback(null, user.comics);
            return;
        }

    });

} // end getFavoriteCharacters