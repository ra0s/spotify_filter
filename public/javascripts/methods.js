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

spotifyApi.searchCategory = (category) => {
    const tracklist = [];
    return spotifyApi.searchTracks('genre:' + category, {limit: 50})
        .then((data) => {
            console.log('Search tracks by ' + data + ' in the artist name', data.body.tracks.items[0].album.name);
            data.body.tracks.items.forEach( (data)=> {
                tracklist.push(new Track(data.album.name, data.popularity, data.artists[0].name, data.name, data.uri))
            })
            return tracklist;
        })
        .catch((err) =>{
            console.log(err);
        });
}

exports.spotifyApi = spotifyApi;