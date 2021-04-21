const authModel = require('../models/authModel');

exports.singUpNewUserController = (req, res) => {

    signUpResponse = authModel.signup(req, res);
    console.log(signUpResponse);

} // end createNewUser

exports.signinUserController = (req, res) => {

   signInResponse = authModel.signin(req, res);
   console.log(signInResponse);

} // end signinUserController