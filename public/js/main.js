
const imageChanged = document.getElementById("cover-art");
const imageEnlarged = document.getElementById("cover-art2");

const cardReject = document.getElementById("card-track");

  function acceptImage(){
    document.getElementById("cover-art").style.transition="20s";
    document.getElementById("cover-art").style.opacity="0.2";
    imageEnlarged.classList.add("scale-in");

  }

  function rejectImage(){
    // imageChanged.classList.add("scale-out");
    cardReject.classList.add("scale-out");
  }
