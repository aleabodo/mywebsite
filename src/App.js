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
      body.style.overflow = 'hidden';

      //Load app
      this.stores.rootStore.loadApp();
    }

    render() {
      console.log(this.stores.authStore.userData.uid)
      if(this.stores.rootStore.isLoaded.app === true) {
        if(this.stores.authStore.userData.uid !== null) {
          return(<Main />);
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
