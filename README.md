# liri-node-app

Your Wish is My Command:
This is a command line app that takes in spefic commands and outputs data from Twitter, Spotify, and OMDB. Please install all node packages before running the program

## Node Packages
- Liri (https://www.npmjs.com/package/liri)
- Inquirer (https://www.npmjs.com/package/inquirer)
- Spotify (https://www.npmjs.com/package/node-spotify-api)
- Twitter (https://www.npmjs.com/package/twitter)
- OMDB: By request url (http://www.omdbapi.com/?apikey=[yourkey]&)

## Usage
This app runs in your terminal.
Type in these commands to run app:
1. To get my latest tweets:
    node liri.js my-tweets
- This command will grab the lastest 20 tweets from my twitter page

2. To spotify a song:
    node liri.js spotify-this-song (enter a song name)
- This will grab the first 5 matches to the title of the song and print out album information

3. To get movie info:
    node liri.js movie-this (enter a movie title)
- This will provide you with movie information (name, year, actors, languages, etc)

4. To run a random command from another file (random.text):
    node liri.js do-what-it-says

## Captures
Here are some screen shots of the app working:
![Some Code](./images/liri1.png?raw=true "Some Code")
![Spotify Results](./images/liri5.png)
![Terminal results for Movie](./images/liri4.png)
![Terminal Commands](./images/liri3.png)



 
