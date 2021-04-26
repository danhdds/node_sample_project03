characterModel = require('../models/characterModel');
userModel = require('../models/userModel');

exports.getMarvelCharacters = (req, res) => {

    characterModel.getCharacters(function(characters){
        res.send({characters});
        //console.log(characters);
    });
    
}

exports.getMarvelCharacter = (req, res) => {

    characterModel.getCharacter(req, function(character){
        res.send({character});
    });

}

exports.addCharacterToFavorites = (req, res) => {

    userModel.addCharacterToFavorites(req, res, function(err, result){

        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (result) {
            res.send({ message: "Character adicionado aos favoritos!" });
            return;
        }

    });

}