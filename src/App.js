import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

/*
* Functions import
*/

/*
* Components import
*/
import Loading from './pages/Loading';
import Main from './pages/Main';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';


/*
###############################
Components -- START
###############################
*/

/*
###############################
Components -- END
###############################
*/



const App = inject("rootStore") ( observer(
  class App extends Component {
    constructor(props) {
      super(props);

      //Stored information
      this.stores = this.props.rootStore.stores;
    }

    componentDidMount() {
      //Overwrite body design
      const body = document.getElementsByTagName('body')[0];
      body.style.margin = '0';
      body.style.padding = '0';
      body.style.overflow = 'auto';

      //Load app
      this.stores.rootStore.loadApp();
    }

    render() {
      if(this.stores.rootStore.isLoaded.app === true) {
        if(this.stores.authStore.userData.uid !== null && this.stores.authStore.userData.userData !== null) {
          if(this.stores.authStore.userData.userData.emailVerified) {
            return(<Main />);
          } else {
            return(<VerifyEmail />);
          }
        } else {
          return(<Login />);
        }
      } else {
        return(<Loading />);
      }
    }
  }
));

export default App;
