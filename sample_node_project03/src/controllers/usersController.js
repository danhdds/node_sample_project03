usersModel = require('../models/userModel');

exports.getUserController = (req, res) => {

    var userDatabase = usersModel.getUserFromDatabase();
    let user = [];

    //console.log("user real from controller: "+ usersDataBase);
    userDatabase.then(function (result) {

        for (i in result) {

            user = result[i];

            //console.log(allUsersDatabase[0]);
        } // end for

        res.render('index', { user: user });

    });


} // exports.getDebtController