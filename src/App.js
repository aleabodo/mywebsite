import React, { Component } from 'react';

/*
* Functions import
*/

/*
* Components import
*/
import Loading from './components/Loading';
import Main from './pages/Main';

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
      if(this.stores.rootStore.isLoaded.app === true) {
        if(this.stores.authStore.userData.uid !== null) {
          return(<Main />);
        } else {
          return(<Login />);
        }
      } else {
        return(<Loading />);
      }
    );
  }
));

export default App;
