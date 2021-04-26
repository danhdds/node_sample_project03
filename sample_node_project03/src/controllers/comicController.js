comicModel = require('../models/comicModel');

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