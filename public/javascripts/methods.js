const SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: 'cfce71627486462793a9998a7c46c03a',
    clientSecret: 'b6e52ba4947b4e8ea700db9423cdba9c',
});

spotifyApi.initCredential = function() {
    spotifyApi.clientCredentialsGrant().then(
        function (data) {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);

            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
            // this.accessToken = data.body['access_token'];
        },
        function (err) {
            console.log(
                'Something went wrong when retrieving an access token',
                err.message
            );
        }
    ).then(function(){
        spotifyApi.getCategories({
            limit: 50,
            offset: 0,
            country: 'US',

        })
            // .then(function (data) {
            //     // console.log(data.body.categories.items[0].name);
            //     // return data.body.categories.items;
            //     data.body.categories.items.forEach(function (songs) {
            //         console.log(songs.name)
            //     })
            // });
    })
    // .then(function(data){
    //    data.forEach(function(songs){
    //         console.log(songs.name + '\n')
    //    })
    // })
    // .then(function(data){
    //     spotifyApi.getCategory(data, {
    //         country: 'US',
    //     })
    //         .then(function (data) {
    //             console.log(data.body);
    //         }, function (err) {
    //             console.log("Something went wrong!", err);
    //         });
    // })
    // .catch(
    //     console.log('error in initCredential function')
    // )
}

spotifyApi.searchCategory = (category) =>{
    spotifyApi.searchTracks('genre:' + category)
        .then(function (data) {
            console.log('Search tracks by ' + data + ' in the artist name', data.body.tracks);
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}

exports.data = spotifyApi;