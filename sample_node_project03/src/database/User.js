var mongoose = require('mongoose');

var Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

var userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String
}, {collection:'users'});

var User = mongoose.model('User', userSchema);

module.exports = User;