const SpotifyWebApi = require('spotify-web-api-node');
const { Track } = require('../../models/track');
require('dotenv').config();

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
});


spotifyApi.initCredential = function() {
    spotifyApi.clientCredentialsGrant()
    .then(
        function (data) {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);

            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
        })
        .catch( function(err) {
            console.log(err)
        })
}

spotifyApi.findTracks = (category) => {
    const tracklist = [];
    return spotifyApi.searchTracks('genre:' + category, {limit: 50})
        .then((data) => {
            console.log(data.body.tracks.items[0].album.name);
            data.body.tracks.items.forEach( (data)=> {
                tracklist.push(new Track(data.album.name, data.popularity, data.artists[0].name, data.name, data.uri))
            })
            return shuffle(tracklist);
        })
        .catch((err) =>{
            console.log(err);
        });
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
 
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
 
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
 
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    const tracklist = [];
    for( let i = 0; i < 12; i++)
    {
        tracklist.push(array[i]);
    }
 
    return tracklist;
 }

exports.spotifyApi = spotifyApi;
