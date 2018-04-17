require('dotenv').config();
var fs = require('fs'); 
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var keys = require('./keys.js');

// Grabs the command from the terminal
var command = process.argv[2];
var input = "";

// Puts together the search value into one string
for (var i = 3; i < process.argv.length; i++) {
    input += process.argv[i] + " ";
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
        console.log(command + " is not a command that I recognize. Try one of these commands: \n\n  1. For a random search: node liri.js do-what-it-says \n\n  2. To search a movie title: node liri.js movie-this (with a movie title following) \n\n  3. To search Spotify for a song: node liri.js spotify-this-song \n\n 4. To see the lastest 20 tweets on by Lina on Twitter: node liri.js my-tweets \n");
};

//=========Twitter Function=========//
function getTweets() {
    // Accesses Twitter Keys
    var client = new Twitter(keys.twitter); 
    var params = {
        screen_name: 'LINA_khn',
        count: 20
        };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        console.log("----------------");
        for (var i = 0; i < tweets.length; i++) {
            console.log(i + 1 + ". Tweet: ", tweets[i].text);

            // For alingment once the number of the tweet is 10 or higher
            if (i + 1 > 9) {
                console.log("    Tweeted on: ", tweets[i].created_at + "\n");
            } else {
                console.log("   Tweeted on: ", tweets[i].created_at + "\n");
            }        
        };
        console.log("--------------")
    });
};

//=========Spotify Functions=========//
function searchSong(input) {
    // Accesses Spotify keys  
    spotify = new Spotify(keys.spotify)

     // Default search value if no song is given
     if (input === '') {
        input = 'Under the Iron Sea';
    }
    // Searches Spotify with given values
    spotify.search({ type: 'track', query: input}, function(error) {
        if (error) {
            console.log(error)
        };

        var songResp = response.tracks.items;
        for (var i = 0; i < songResp.length; i++) {
            console.log("\n=============== Spotify Search Result "+ (i+1) +" ===============\n");
            console.log(("Artist: " + songResp[i].artists[0].name));
            console.log(("Song title: " + songResp[i].name));
            console.log(("Album name: " + songResp[i].album.name));
            console.log(("URL Preview: " + songResp[i].preview_url));
            console.log("\n=========================================================\n");
        }

        fs.appendFile("log.txt", "\n========= Result "+ (i+1) +" =========\nArtist: " + songResp[i].artists[0].name + "\nSong title: " + songResp[i].name + "\nAlbum name: " + songResp[i].album.name + "\nURL Preview: " + songResp[i].preview_url + "\n=============================\n", (error) =>{
            if (error) {
                console.log(error);
            }
        }
    )}
)};
