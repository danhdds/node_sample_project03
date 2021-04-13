const User = require('../database/User.js');

exports.getUserFromDatabase = async (req, res) => {
    let user = () => (User.find({}).exec());
    try { return ({ "user": await user() }); }
    catch (e) { console.log(e) }
}