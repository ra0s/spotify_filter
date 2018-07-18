
class Track{
    constructor(album_name, popularity, artist, song_name, external_url, preview_url, album_art){
        this.album_name = album_name;
        this.popularity = popularity;
        this.artist = artist;
        this.song_name = song_name;
        this.external_url = external_url;
        this.preview_url = preview_url;
        this.album_art = album_art;
    }
}

exports.Track = Track;