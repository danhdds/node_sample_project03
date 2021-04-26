characterModel = require('../models/characterModel');

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