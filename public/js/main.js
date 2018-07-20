console.log('cardTop');

var allAddButtons = document.getElementsByClassName("btn-floating");

var addSongToList = function() {
  var musicList = document.getElementById('musiclist');

  var songName = this.getAttribute('name');
  var artistName = this.getAttribute('artist');
  var albumName = this.getAttribute('album');

  console.log(songName);

  var htmlToInsert =
    '<li class="collection-item avatar">\n' +
    '<img src="images/yuna.jpg" alt="" class="circle">\n' +
    '<i class="material-icons circle">music_note</i>\n' +
    '<span class="title"><b>'+ songName+'</b></span>\n' +
    '<p>'+artistName+ '<br></p>\n' +
    '<p class="grey-text">'+albumName+'</p>\n' +
    '</li>';

  musicList.insertAdjacentHTML('beforeend', htmlToInsert);
};

for (var i = 0; i < allAddButtons.length; i++) {
  allAddButtons[i].addEventListener('click', addSongToList, false);
}
