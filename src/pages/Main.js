import React, {Component} from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';

/*
* Functions import
*/

/*
* Component imports
*/
import LoadingPage from '../components/loadingPage';
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
        {/*<LoadingPage />*/}
        <Menu />
      </div>
    );
  }


  getStyles() {
    return {
      
    }
  }
}

export default Main;
