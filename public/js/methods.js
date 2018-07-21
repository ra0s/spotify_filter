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

spotifyApi.findTracks = (category, pop) => {
    const tracklist = [];
    let count = 0;
    let os = 0;
    if(pop == 40)
        os = 2000;
    if(pop == 65)
        os = 750;
    if(pop == 80)
        os = 100;

    return recursive(tracklist, category, os, pop, count);
}

function recursive(arr, category, os, pop, count){
    return spotifyApi.searchTracks('genre:' + category, { limit: 50, offset: os, time_range: 'short_term'})
    .then((data) => {
        data.body.tracks.items.forEach((data) => {
            if (data.popularity <= pop)
            arr.push(new Track(data.album.name, data.popularity, data.artists[0].name, data.name, data.id))
        })
        console.log(arr.length)
        return arr;
    })
    .then((data) =>{
        count++;
        console.log("THIS IS COUNT: " + count);
        if(arr.length < 50 && count < 30){
            return recursive(arr, category, os+50, pop, count);
        }else{
            return shuffle(arr);
        }
    })
    .catch( (err) => { console.log(err)});
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
    let x = 0;
    if(array.length < 20)
        x = array.length;
    else
        x = 20;
    for( let i = 0; i < x; i++)
    {
        tracklist.push(array[i]);
    }
 
    return tracklist;
 }

exports.spotifyApi = spotifyApi;
