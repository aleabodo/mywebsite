import React, {Component} from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Container } from 'semantic-ui-react';

/*
* Functions import
*/

/*
* Component imports
*/
import Headline from '../../components/Headline';

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



class Home extends Component {
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
      <Container text>
        <Headline black="alexbell." red="ninja" />

        <p>
          Yo, what's up? Ninja here! Feel free
          to browse around a little and try some of what you can find here :)
        </p>
      </Container>
    );
  }


  getStyles() {
    return {

    }
  }
}

export default Home;
