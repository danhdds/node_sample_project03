
userModel = require('../models/userModel.js');

checkDuplicateUsernameOrEmail = (req, res, next) => {

    userModel.checkUsernameAndEmail(req, res, next, function(user, err, email){
        
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        
        if(user){
            res.status(400).send({ message: "Falha! nome de usuário já cadastrado!" });
            return;
        }

        if(email){
            res.status(400).send({ message: "Falha, email já em uso!" });
            return;
        }
        
    });
    
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;