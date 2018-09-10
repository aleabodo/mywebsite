/*
* Firebase initializeApp START -------------------------
*/
var firebase = require('firebase/app');

require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");


var config = {
  apiKey: "AIzaSyCjWyrIzayUmEBcMcQyPvcXjNDkQONfJA8",
  authDomain: "base-6d44c.firebaseapp.com",
  databaseURL: "https://base-6d44c.firebaseio.com",
  projectId: "base-6d44c",
  storageBucket: "base-6d44c.appspot.com"
};

/*var config = {
  apiKey: "AIzaSyDHnDObdPUAOFJfRpgC1tOG59NhheQYUmk",
  authDomain: "netwoko-staging.firebaseapp.com",
  databaseURL: "https://netwoko-staging.firebaseio.com",
  projectId: "netwoko-staging",
  storageBucket: "netwoko-staging.appspot.com"
};*/

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
