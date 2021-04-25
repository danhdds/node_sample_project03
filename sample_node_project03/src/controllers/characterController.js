characterModel = require('../models/characterModel');

exports.getMarvelCharacters = (req, res) => {

    characterModel.getCharacters(function(characters){
        res.send({characters});
        //console.log(characters);
    });
    

}