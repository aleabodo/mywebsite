import { observable } from 'mobx';
import alertify from 'alertify.js';

//Firebase
var firebase = require('./fb').fb
var firebase_orig = require('./fb').firebase
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();


class AuthStore {
  /*#######################################################
  ##  Vars
  ##
  ##    userData
  /*#######################################################*/
  //Authentification information, for example user data of logged in user
  //auth is userData result from auth().onAuthStateChanged()
  //User information of logged in user
  userData = observable({
    uid: null,
    userData: null
  });

  /*#######################################################
  ##  Functions
  ##
  ##    load
  ##    getUserInfo
  ##    verifyPhone
  ##    signOut
  /*#######################################################*/
  load() {
    //Load all auth related things

    console.info("Loading authStore");
    this.stores.rootStore.isLoaded.app = false;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //Logged in

        console.info("Logged in as " + user.uid);
        Object.assign(this.userData, {
          uid: user.uid
        });

        console.info("AuthStore loaded");
        this.stores.rootStore.isLoaded.app = true;

      } else {
        //Logged out

        console.info("Logged out");
        Object.assign(this.userData, {
          uid: null
        });

        console.info("AuthStore loaded");
        this.stores.rootStore.isLoaded.app = true;
      }
    });
  }


  getUserInfo(userId) {
    //Returns all user info from firestore.
    //Param: userId
    //Returns a promise

    return new Promise(function (resolve, reject) {
      var docRef = db.collection("users").doc(userId);
      return docRef.get().then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          // doc.data() will be undefined in this case
          alertify.delay(0).error("Base Web doesn't support signing up yet. Please install the mobile app to sign up! Refresh Base Web after!");
          console.error("User with id " + userId + " not found in user db!");
          reject()
        }
      }).catch(function(error) {
          console.error("Error getting document:", error);
          reject()
      });
    });
  }


  createSignInRecaptcha(phoneNumber) {
    firebase.auth().useDeviceLanguage();

    window.recaptchaVerifier = new firebase_orig.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.signIn();
      }
    });

    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
  }


  signIn(){
    //Verify phone number and then sign in

    console.info("Verify phone number");

    const phoneNumber = this.userData.phoneCode + this.userData.phoneNumber;

    alertify.log("....Sending verification code....");
    firebase_orig.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier).then(function (confirmationResult) {
      //Code verification prompt
      alertify.log("You will receive a SMS with a verification code soon.");
      alertify.prompt("You will receive a SMS with a verification code soon. Please check your SMS on your phone. Enter the code below:",
        function (val, ev) {
          ev.preventDefault();
          //Confirm code
          confirmationResult.confirm(val).then(function (result){
            alertify.success("Successfully signed in");
          }).catch(function () {

            alertify.error("Wrong code!");
          });
        },
        function(ev) {
          ev.preventDefault();

          alertify.error("You've cancelled the phone verification");
        }
      );
    })
    .catch(function (error) {
      window.recaptchaVerifier.reset(window.recaptchaWidgetId);
      alertify.delay(0).error("Base Web doesn't support signing up yet. Please install the mobile app to sign up! Refresh Base Web after!");
      console.error(error.code);
    });
  }


  signOut(){
    //Signes user out

    firebase_orig.auth().signOut().then(function(){

    }).catch(function(error){
      console.error(error);
    });
  }

}

export default AuthStore;
