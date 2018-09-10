const createId = function() {
  //Creates a unique id for each chat bubble so that the animation can be triggered

  var random = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 10; i++)
    random += possible.charAt(Math.floor(Math.random() * possible.length));

  while(true) {
    if(!document.getElementById(random)) {
      return random;
    }
  }
}

export default createId;