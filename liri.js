//all the npm packages

var fs = require("fs");
var request = require("request");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var keys = require("./keys.js");
//twitter keys
var accountTweets = new Twitter(keys.twitterKeys);
//spotify keys
var spotify = new Spotify({
	id: "490ffa49217541cc994a6cf70636c9e1",
	secret: "4d660f3a6a72412fa8b38d58d6dc9d30"
});

//search paramaters 
var limitTweets = 20;
var limitSpotify = 1;
//command input
var command = process.argv[2];	
//query input
//this was taken almost directly from an in-class assignment 
var nodeArgs = process.argv;
// Create an empty variable for holding the movie name
var value = "";
// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    value = value + "+" + nodeArgs[i];
  }
  else {
    value += nodeArgs[i];
  }
}
//Next I have some functions that I will later call depending on the user input
//the first function is for returning the latest 20 tweets from my Twitter account

function myTweets(){
//this first piece is taken almost directly from the twitter NPM documentation
	var params = {screen_name: 'spbpspb', count: limitTweets};
	accountTweets.get('statuses/user_timeline', params, function(error, tweets, response) {
//if there is an error this will console.log the error
		if(error){
			console.log(error);
		}
//iterates through the last 20 tweets and prints them in a readable manner with date tweeted
	  	else if (!error) {
			console.log("\nThese are your last " + (tweets.length) + " tweets: \n");
	  		for(var i = 0 ;  i < tweets.length ; i++){
	  		console.log("Tweet " + (i+1) + ": " + "\n" + tweets[i].text +
	  		"\n" + "Created on: " + tweets[i].created_at);
	  		console.log("-------------------------");
	  		}
	  	}
	});
}

//function for movies
function movieInfo(value) {
	//if a user passes in a value then value == true, so it takes the users query and returns the relevant data
	if (value) {
		var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&tomatoes=true&r=json&apikey=40e9cece";
		request(queryUrl, function (error, response, body) {
			if (error || response.statuscode === 404){
				console.log("We Couldn't find that movie, please try again.");
			}	
			else if (!error && response.statusCode === 200){
				var body = JSON.parse(body);
	            console.log("\nMovie Title: " + body.Title + "\n ");
	            console.log("Year Released: " + body.Released + "\n ");
	            console.log("Rating: " + body.Rated + "\n ");
	            console.log("Production Country: " + body.Country + "\n ");
	            console.log("Language: " + body.Language + "\n ");
	            console.log("Plot: " + body.Plot + "\n ");
	            console.log("Actors: " + body.Actors + "\n ");
	            console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value + "\n ");
	            console.log("Rotten Tomatoes URL: " + body.tomatoURL);
	            return;
			}
		});
	}
	//if user didn't pass in a value the default value is set here
	//the default title that returns is Heavy Metal 
	if (value == false){
		queryUrl = "http://www.omdbapi.com/?t=heavy+metal&y=&tomatoes=true&r=json&apikey=40e9cece";
		request(queryUrl, function (error, response, body) {
			if (!error && response.statusCode === 200){
				var body = JSON.parse(body);
	            console.log("\nMovie Title: " + body.Title + "\n ");
	            console.log("Year Released: " + body.Released + "\n ");
	            console.log("Rating: " + body.Rated + "\n ");
	            console.log("Production Country: " + body.Country + "\n ");
	            console.log("Language: " + body.Language + "\n ");
	            console.log("Plot: " + body.Plot + "\n ");
	            console.log("Actors: " + body.Actors + "\n ");
	            console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value + "\n ");
	            console.log("Rotten Tomatoes URL: " + body.tomatoURL);
	            return;
			}
		});
	}
}



function spotifyMe(){
	if(value){
		spotify.search({ type: "track", query: value, limit: "1" }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		    else{
		    	console.log("\nArtist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2) + "\n ");
		 		console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name) + "\n ");
		 		console.log("Album: " +JSON.stringify(data.tracks.items[0].album.name) + "\n ");
		 		console.log("Link: " + JSON.stringify(data.tracks.items[0].album.external_urls));;
		    }	     
		});
	}
//similar thing as the movie function

	else if(value == false){
		spotify.search({ type: "track", query: "Cheap Sunglasses", limit: "1" }, function(err, data) {
			console.log("\nArtist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2) + "\n ");
	 		console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name) + "\n ");
	 		console.log("Album: " +JSON.stringify(data.tracks.items[0].album.name) + "\n ");
	 		console.log("Link: " + JSON.stringify(data.tracks.items[0].album.external_urls));;
	 	});
	}
}

//this is the function that takes the data from my random.txt file and passes it as a search value in the Spotify function


function random(){
//this line is accessing the .txt file
	fs.readFile('./random.txt',  'utf8', function(err, data) {
		if(err) {
			return console.log(err);
		}
		else {
		console.log(data);
//turning the text file into an array where the first index is the command and the second index is the value
		var arr = data.split(",");
		value = arr[1];
//this is saying if the command name at index[0] matches the string, invoke the function
			if (arr[0] == "movie-this"){
				movieInfo(value);
			}
			else if (arr[0] == "spotify-this"){
				spotifyMe(value);
			}
			else if (arr[0] == "my-tweets"){
				myTweets();
			}	
		}
	});
}

if(command == "my-tweets"){
	myTweets();
}
else if(command == "movie-this"){
	movieInfo(value);
}
else if (command == "spotify-this"){
	spotifyMe(value);
}
else if (command == "do-what-it-says"){
	random();

}
else{
	console.log(" Please give the correct command, type in 'node liri.js' \n and then either type 'my-tweets' or 'spotify-this' and a song title for data on a song,\n 'movie-this' and a movie title for data on a movie");
}

