const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const crypto = require('crypto');

let timeStamp = (Date.now()).toString();
const publicKey = "22c1055ecebbb33d57c051ba098f5070";
const privateKey = "afb09231e3d7377d15a2090bb911ae80018f8ddc";
let hash = crypto.createHash('md5').update(timeStamp + privateKey + publicKey).digest('hex');

const params = new URLSearchParams();
params.append('ts', timeStamp);
params.append('apikey', publicKey);
params.append('hash', hash);

exports.getCharacters = (callback) => {

    fetch('http://gateway.marvel.com/v1/public/characters?'+'ts='+timeStamp+'&apikey='+publicKey+'&hash='+hash)
    .then(res => res.json())
    .then(json => callback(json.data.results));

}

exports.getCharacter = (req, callback) => {

    fetch(req.body.url+'?ts='+timeStamp+'&apikey='+publicKey+'&hash='+hash)
    .then(res => res.json())
    .then(json => callback(json.data.results));

}