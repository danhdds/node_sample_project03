usersModel = require('../models/userModel');

exports.renderMainUserPage = (req, res) => {

    res.render('index');

} // exports.getDebtController

exports.getUserBoardController = (req, res) => {

    res.status(200).send("User Content.");

};