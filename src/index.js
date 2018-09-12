import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import RootStore from './stores/rootStore';

/*
* Import css
*/
import './styles/keyframes.css';
import './styles/loadingPage/loadingPage.css';

/*
* Import funtions
*/
import history from './stores/functions/history';

/*
* Components import
*/
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';


ReactDOM.render(
  <Provider rootStore={new RootStore()}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
