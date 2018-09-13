import React, {Component} from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Segment, Container } from 'semantic-ui-react'

/*
* Functions import
*/

/*
* Component imports
*/
import Menu from '../components/Menu/Menu';

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
    //Initial loading screen

    /*
    * Expected props
    *   - /
    */

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


  render() {
    return(
      <div>
        <Menu>
          <div style={{minHeight: '100vh'}}>
            <Container className={this.classes.mainContainer}>
              <Segment>
                awdawd
              </Segment>
            </Container>
          </div>
        </Menu>
      </div>
    );
  }


  getStyles() {
    return {
      mainContainer: {
        paddingTop: '80px'
      }
    }
  }
}

export default Main;
