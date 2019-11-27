import { observable } from 'mobx';
import alertify from 'alertify.js';

//Firebase
var firebase = require('./fb').fb
var firebase_orig = require('./fb').firebase
// Initialize Cloud Firestore through Firebase
//var db = firebase.firestore();


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
  ##    signIn
  ##    signOut
  /*#######################################################*/
  load() {
    //Load all auth related things

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //Logged in

        console.info("Signed in as " + user.uid);
        Object.assign(this.userData, {
          uid: user.uid,
          userData: user
        });

        console.info("AuthStore loaded");
        this.stores.rootStore.isLoaded.app = true;

      } else {
        //Logged out

        console.info("Signed out");
        Object.assign(this.userData, {
          uid: null
        });

        console.info("AuthStore loaded");
        this.stores.rootStore.isLoaded.app = true;
      }
    });
  }


  signIn(email, password){
    //Sign in user with email and password
    
    return( 
      new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
          alertify.success("Signed in");
          resolve();
        }).catch(function(error) {
          var errorCode = error.code;
    
          if(errorCode === 'auth/wrong-password') {
            //Wrong password
            alertify.error("Password incorrect!");
            reject(error);
          }
    
          if(errorCode === 'auth/user-not-found') {
            //User not signed up yet. Sign up user now
    
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
              alertify.success("Signed in");

              var user = firebase.auth().currentUser;

              user.sendEmailVerification().then(function() {
                // Confirmation email sent.
                resolve();
              }).catch(function(error) {
                // An error happened.
                reject(error);
              });
            }).catch(function(error) {
              alertify.error(error.message);
              reject(error);
            });
          }
        });
      })
    ); 
  }


  signOut(){
    //Signes user out

    firebase_orig.auth().signOut().then(function(){
      console.log('User signed out');
    }).catch(function(error){
      console.error(error);
    });
  }

}

export default AuthStore;
