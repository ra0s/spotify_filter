var allAddButtons = document.getElementsByClassName("btn-floating");

var artistList = [];
var songList = [];
var albumList = [];

var addSongToList = function() {
  var musicList = document.getElementById('musiclist');

  var songName = this.getAttribute('name');
  var artistName = this.getAttribute('artist');
  var albumName = this.getAttribute('album');
  var uri = this.getAttribute('uri');
  console.log(songName);
  console.log(uri);

  var htmlToInsert =
    '<a class="collection-item avatar song-item" onclick="removeItem()">\n' +
    '<img src="images/yuna.jpg" alt="" class="circle">\n' +
    '<i class="material-icons circle">music_note</i>\n' +
    '<span class="title"><b>'+ songName+'</b></span>\n' +
    '<p>'+artistName+ '<br></p>\n' +
    '<p class="grey-text">'+albumName+'</p>\n' +
    '<i class="secondary-content material-icons" id= "button-remove">remove_circle</i>\n'+
    '</a>';

  musicList.insertAdjacentHTML('beforeend', htmlToInsert);

  var descriptionItem = document.getElementById('description-list');
  descriptionItem.remove();

  artistList.push(artistName);
  songList.push(songName);
  albumList.push(albumName);

  console.log (artistList);
  console.log(songName);
  console.log(albumName);

};

for (var i = 0; i < allAddButtons.length; i++) {
  allAddButtons[i].addEventListener('click', addSongToList, false);
}

function removeItem(){
  (event.currentTarget).remove();
}

