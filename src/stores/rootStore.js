import { observable } from 'mobx';
import browser from 'browser-detect';
import alertify from 'alertify.js';

//Import stores
import AuthStore from './authStore';


class RootStore {
  constructor() {
    this.stores = {
      rootStore: this,
      authStore: new AuthStore()
    }

    //Pass stores down each store
    this.stores.authStore.stores = this.stores;
  }



  /*#######################################################
  ##  Vars
  ##
  ##    isLoaded
  /*#######################################################*/
  //Includes all loading vars to test whether specific data is loaded or not
  isLoaded = observable({
    app: false
  });



  /*#######################################################
  ##  Functions
  ##
  ##    loadApp
  ##    promiseAll
  /*#######################################################*/
  loadApp() {
    console.log("Your browser: " + browser());

    if(navigator.cookiesEnabled) {
      alertify.delay(0).error("Please activate cookies in your browser! Refresh after");
    }

    //Load auth store
    this.stores.authStore.load();
  }
}

export default RootStore;
