comicModel = require('../models/comicModel.js');
userModel = require('../models/userModel.js');

exports.getMarvelComics = (req, res) => {

    comicModel.getComics(function(comics){
        res.send({comics});
        //console.log(characters);
    });

}

exports.getMarvelComic = (req, res) => {

    comicModel.getComic(req, function(comic){
        res.send({comic});
    });

}

exports.addComicToFavorites = (req, res) => {

    userModel.addComicToFavorites(req, res, function (err, result){

        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (result) {
            res.send({ message: "Comic adicionado aos favoritos!" });
            return;
        }

    });

}