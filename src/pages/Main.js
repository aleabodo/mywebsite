import React, {Component} from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Segment, Container } from 'semantic-ui-react';
import { Router, Route, Switch } from "react-router-dom";
import history from '../stores/functions/history';

/*
* Functions import
*/

/*
* Component imports
*/
import Menu from '../components/Menu/Menu';
import Home from './home/Home';
import PasswordManager from './passwordManager/PasswordManager';

jss.setup(preset());


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



class Main extends Component {
  constructor(props){
    super(props);
    //Main page

    /*
    * Expected props
    *   - /
    */

    this.handleItemClick = this.handleItemClick.bind(this);

    this.state = {
      activeItem: ''
    }

    //Styles
    this.styles = this.getStyles();
    this.sheet = jss.createStyleSheet(this.styles);
    const {classes} = this.sheet.attach();
    this.classes = classes;
    //Styles
  }


  componentWillUnmount() {
    this.sheet.detach()
  }


  handleItemClick(name) {
    history.push(name);
  }


  render() {
    return(
      <Router history={history}>
        <Menu handleItemClick={this.handleItemClick}>
          <Container className={this.classes.mainContainer}>
            <Segment className={this.classes.mainSegment}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/passwords" component={PasswordManager} />
              </Switch>
            </Segment>
          </Container>
        </Menu>
      </Router>
    );
  }


  getStyles() {
    return {
      mainContainer: {
        paddingTop: '80px'
      },

      mainSegment: {
        position: 'static !important'
      }
    }
  }
}

export default Main;
