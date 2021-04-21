
userModel = require('../models/userModel');

checkDuplicateUsernameOrEmail = (req, res, next) => {

    userModel.checkUsernameAndEmail(req, res, next);
    
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;