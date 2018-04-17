require("dotenv").config();
var fs = require('fs'); 
var request = require('request');
var keys = require('./keys.js');
var Twitter = require('twitter');
//var Spotify = require('node-spotify-api');

//var that grabs terminal commnads
var command = process.argv[2];
var input = '';
//make user input into a string
for (var i = 3; i < process.argv.length; i++) {
    input += process.argv[i] + ' ';
}

//error function
function error(err) {
    if (err) {
        return console.log(err);
    }
};

//Command Cases
switch (command) {
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        searchSong(input);
        break;
    case "movie-this":
        searchMovie(input);
        break;
    case "do-what-it-says":
        randomSearch();
        break;
    default:
        console.log("The command " + command + " is not one I recognize. Please try one of the following commands: my-tweets, spotify-this-song, movie-this, or do-what-it-says.");
};


///Twitter///
//access the keys then...
//get latest tweets from user Lina_khn//
function getTweets(){
    client = new Twitter(keys.twitter);
    var parameters = {
        name: 'Lina_khn',
        count: 20
    };

    fs.appendFile("log.txt", "-----Tweets Log Entry Start-----", errorFunctionStart());
        console.log("-----Lina's Latest-----");

    for (i = 0; i < tweets.length; i++) {
        console.log(i + 1 + ". Tweet: ", tweets[i].text);
    };

    fs.appendFile("log.txt", "-----Tweets Log Entry End-----\n\n", errorFunctionEnd());
};


