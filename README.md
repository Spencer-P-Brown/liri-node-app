# liri-node-app


This is a command line node app that takes in parameters and outputs data. You can pass commands to find data about movies, songs or to view your recent tweets. 

## Setup

1. Clone the repo.

2. In your command line, navigate into the Liri repo using and run npm install to get all of the necessary dependencies.

3. Get Twitter API credentials by going to https://apps.twitter.com/app/new or use existing credentials if you have them.
	- Follow the instructions to get your consumer key, consumer secret, access token key and access token secret.
	- In your text editor, open the keys.js and fill in the empty fields with your API credentials.
	- In your text editor, open liri.js, navigate to line 42, replace the "#" placeholder inside of the params object with your Twitter username.
	- Note: This step is somewhat optional if you don't want to take advantage of the Twitter functionality. You will still be able to search for songs and movies if you choose not to update keys.js with your Twitter API credentials and liri.js with your Twitter username.

4. In your command line run one of the following commands:
	- "node liri my-tweets"                 
			-- to print out a list of your last 20 tweets.

	- "node liri movie-this <movie title>"  
			-- to get information about a movie.
			
	- "node liri spotify-this <song title>" 
			-- to get information about a song.
