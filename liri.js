require('dotenv').config();
var fs = require('fs'); 
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
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
        console.log(
            "\n" + command + " is not a command that I recognize. Try one of these commands: \n 1. To see the lastest 20 tweets by Lina on Twitter: node liri.js my-tweets \n 2. To search Spotify for a song: node liri.js spotify-this-song \n 3. To search a movie title: node liri.js movie-this <enter movie title> \n 4. To do a random search: node liri.js do-what-it-says"
        );
};

//=========Twitter Function=========//
function getTweets() {
    // Accesses Twitter Keys
    var client = new Twitter(keys.twitter); 
    var params = {
        screen_name: 'LINA_khn',
        count: 20
        };

    //append data to log
    fs.appendFile("log.txt", "-----------------------------" 
        + "\n--------Lina's Tweets--------\n" 
        + "Processed on:\n" + Date() 
        + "\nCommand: " + process.argv 
        + "\n-----------------------------\n", 
        function(error){
            if (error) {
                console.log(error);
            }
        });
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        console.log("-----------------------------");
        for (var i = 0; i < tweets.length; i++) {
            console.log(i + 1 + ". Tweet: ", tweets[i].text);
            //make slight alignment fix to numbering
            if (i + 1 > 9) {
                console.log("    Tweeted on: ", tweets[i].created_at + "\n");
            } else {
                console.log("   Tweeted on: ", tweets[i].created_at + "\n");
            }
            
            //append tweets to log
            fs.appendFile("log.txt", (i + 1) 
            + ". Tweet: " + tweets[i].text 
            + "\nTweeted on: " + tweets[i].created_at 
            + "\n", function(error) {
                if (error) {
                    console.log(error);
                }
            });
        };
        console.log("-----------------------------")

    });
};

//=========Spotify Function=========//
function searchSong(input) {
    // Accesses Spotify keys  
    var spotify = new Spotify(keys.spotify)

     // Default search value if no song is given
    if (input === '') {
        input = 'Under the Iron Sea';
    }
    // Searches Spotify with given values
    spotify.search({ type: 'track', query: input, limit: 5}, function(error, response) {
        if (error) {
            console.log(error)
        };

        //append start of data to log.text
        fs.appendFile("log.txt", "-----------------------------" 
        + "\n--------Spotify Data--------\n" 
        + "Processed on:\n" + Date() 
        + "\nCommand: " + process.argv 
        + "\nSong Info Below: \n", 
        function(error){
            if (error) {
                console.log(error);
            }
        });

        //make variable to store response
        var song = response.tracks.items;
        for (var i = 0; i < song.length; i++) {
            console.log(
                "\n===Spotify Result "+ (i+1) +"===\n" 
                + "\nArtist: " + song[i].artists[0].name 
                + "\nSong title: " + song[i].name 
                +"\nAlbum name: " + song[i].album.name 
                + "\nURL Preview: " + song[i].preview_url 
                + "\n======================"
            );

            fs.appendFile("log.txt", "\n========= Result "+ (i+1) +" =========\nArtist: " + song[i].artists[0].name + "\nSong title: " + song[i].name + "\nAlbum name: " + song[i].album.name + "\nURL Preview: " + song[i].preview_url + "\n=============================\n", function(error) {
                if (error){
                    console.log(error);
                }
            })
        }
    })
};

//==========OMDB Function==========//
function searchMovie(input) {
    //if no movie specified...get Mr. Nobody
    if (input === "") {
        input = "Mr. Nobody"
        console.log ('If you have not watched "Mr. Nobody," check it out on Netflix!');
    }

    //request info from omdb, use trim to remove extra spaces
    var queryUrl = "http://www.omdbapi.com/?t=" + input.trim() + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {
        if (error) {
            console.log('There was an error: ' + error);
        }

        if (JSON.parse(body).Error == 'Movie not found!' ) {
            console.log("Movie not found. Check your spelling or try a different title.");
        } else {
            movie = JSON.parse(body);
            console.log(
                '\n----OMDB Results----' +
                '\nMovie Title: ' + movie.Title +
                '\nYear: ' + movie.Year + 
                '\nIMDB Rating: ' + movie.imdbRating + 
                '\nRotten Tomatoes Rating: ' + movie.Ratings[[1]].Value + 
                '\nProduced in: ' + movie.Country + 
                '\nLanguage: ' + movie.Language + 
                '\nPlot: ' + movie.Plot + 
                '\nActors: ' + movie.Actors + 
                '\n--------------------'
            );
        };

    });
};

//==========Do What It Says Function==========//
//access the random text file, runs command in file
function randomSearch() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var randomArr = data.split(', ');
        console.log(randomArr);
        if (error) {
            console.log(error);
        }else  if (randomArr[0] === 'spotify-this-song'){
            searchSong(randomArr[1]);
        }else if (randomArr[0] === 'movie-this') {
            searchMovie(randomArr[1]);
        } else {
            getTweets();
        }
    });
};

//=====Write to Log.txt file function

function updateLog
(){
    fs.appendFile("log.txt", "-----Log Entry-----"
    + "\nDate:\n" + Date() 
    + "\nCommand:\n" + process.argv 
    + "\nData Output: \n", function(error) {
        if (error){
            console.log(error);
        }
    })
}