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

// spotifyApi.findTracks = (category, pop, offset) => {
//    const tracklist = [];
//    let os = 0 + offset;
//    if(pop == 80)
//         os += 50;
//     if(pop == 60)
//         os += 400;
//     if(pop == 40)
//         os += 1000;
//    return spotifyApi.searchTracks('genre:' + category, {limit: 50, offset: os, time_range: 'long_term'})
//        .then((data) => {
//            data.body.tracks.items.forEach( (data)=> {
//                if(data.popularity <= pop)
//                tracklist.push(new Track(data.album.name, data.popularity, data.artists[0].name, data.name, data.uri))
//            })
//            return shuffle(tracklist);
//        })
//        .catch((err) =>{
//            console.log(err);
//        });
// }

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

   return array;
}

spotifyApi.findTracks = (category, pop) => {
    const tracklist = [];
    let count = 0;
    let os = 0;
    if(pop == 40)
        os = 1500;

    return recursive(tracklist, category, os, pop, count);
}
   
function recursive(arr, category, os, pop, count){
    return spotifyApi.searchTracks('genre:' + category, { limit: 50, offset: os, time_range: 'medium_term'})
    .then((data) => {
        data.body.tracks.items.forEach((data) => {
            if (data.popularity <= pop)
            arr.push(new Track(data.album.name, data.popularity, data.artists[0].name, data.name, data.uri))
        })
        console.log(arr.length)
        return arr;
    })
    .then((data) =>{
        count++;
        console.log("THIS IS COUNT: " + count);
        if(arr.length < 50 && count < 20){
            return recursive(arr, category, os+50, pop, count);
        }else{
            return arr;
        }
    })
    .catch( (err) => { console.log(err)});
}

exports.spotifyApi = spotifyApi;