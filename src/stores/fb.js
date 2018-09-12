/*
* Firebase initializeApp START -------------------------
*/
var firebase = require('firebase/app');

require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");


var config = {
  apiKey: "AIzaSyDpuphZnuu8U-5CDm1xxdiAFmXukOFav_g",
  authDomain: "homepagelogin-d83db.firebaseapp.com",
  databaseURL: "https://homepagelogin-d83db.firebaseio.com",
  projectId: "homepagelogin-d83db",
  storageBucket: "homepagelogin-d83db.appspot.com"
};

var fb;

try {
  fb = firebase.app();
  //const auth = firebase.auth();
  //console.log(auth);
}
catch (err) {
  fb = firebase.initializeApp(config);
  const firestore = firebase.firestore();

  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);
}

module.exports = {
  fb,
  firebase
}
/*
* Firebase initializeApp END --------------------------
*/
