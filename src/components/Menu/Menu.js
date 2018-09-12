import React, {Component} from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Menu, Button } from 'semantic-ui-react'

/*
* Functions import
*/

/*
* Component imports
*/

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

    this.handleItemClick = this.handleItemClick.bind(this);

    this.state = {
      activeItem: 'Home'
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


  handleItemClick(e, { name }) {
    this.setState({ 
      activeItem: name
    });
  } 


  render() {
    const activeItem = this.state.activeItem

    return(
      <Menu stackable fixed="top">
        <Menu.Item header>
          <img alt="" src={require('../../files/images/logo.svg')} style={{display: 'block', width: '60px', height: '45px'}} />
        </Menu.Item>

        <Menu.Item
          name='Home'
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item name='A' active={activeItem === 'A'} onClick={this.handleItemClick}>
          Password manager
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Button primary>Sign out</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }


  getStyles() {
    return {
      
    }
  }
}

export default Main;
