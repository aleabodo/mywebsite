import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Menu, Icon, Sidebar, Button } from 'semantic-ui-react';

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



const Main = inject("rootStore") ( observer(
  class Main extends Component {
    constructor(props){
      super(props);
      //Initial loading screen

      /*
      * Expected props
      *   - handleItemClick(): function, void
      */

      //Stored information
      this.stores = this.props.rootStore.stores;

      this.handleItemClick = this.handleItemClick.bind(this);
      this.handleButtonClick = this.handleButtonClick.bind(this);
      this.handleSidebarHide = this.handleSidebarHide.bind(this);

      this.state = {
        visible: false
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
      this.props.handleItemClick(name);

      this.setState({
        visible: false
      });
    }

    handleButtonClick() {
      this.setState({
        visible: true
      });
    }

    handleSidebarHide() {
      this.setState({
        visible: false
      });
    }


    render() {
      const activeItem = window.location.pathname;

      if(window.innerWidth > 700) {

        //Desktop menu

        return(
          <div>
            <Menu stackable fixed="top">
              <Menu.Item header>
                <img alt="" src={require('../../files/images/logo.svg')} style={{display: 'block', width: '60px', height: '45px'}} />
              </Menu.Item>
  
              <Menu.Item name='/' active={activeItem === '/'} onClick={this.handleItemClick} as='a'>
                Home
              </Menu.Item>
  
              <Menu.Item name='/passwords' active={activeItem === '/passwords'} onClick={this.handleItemClick} as='a'>
                Password manager
              </Menu.Item>
    
              <Menu.Menu position='right'>
                <Menu.Item>
                  <Button primary onClick={this.stores.authStore.signOut}>Sign out</Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>
            <div style={{minHeight: '100vh'}}>
              {this.props.children}
            </div>
          </div>
        );
      } else {

        //Mobile sidebar

        return(
          <div>
            <Sidebar.Pushable>
              <Sidebar
                as={Menu}
                animation='overlay'
                onHide={this.handleSidebarHide}
                visible={this.state.visible}
                vertical
                width='thin'
              >
                <Menu.Item header>
                  <img alt="" src={require('../../files/images/logo.svg')} style={{display: 'block', width: '60px', height: '45px'}} />
                </Menu.Item>

                <Menu.Item name="Home" active={activeItem === 'Home'} onClick={this.handleItemClick} as='a'>
                  Home
                </Menu.Item>

                <Menu.Item name="Password manager" active={activeItem === 'Password manager'} onClick={this.handleItemClick} as='a'>
                  Password manager
                </Menu.Item>
              </Sidebar>

              <Sidebar.Pusher dimmed={this.state.visible}>
                <Icon className={this.classes.burgerButton} link color="red" size="huge" name="bars" onClick={this.handleButtonClick} />
                {this.props.children}
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
        )
      }
      
    }


    getStyles() {
      return {
        burgerButton: {
          position: 'fixed',
          zIndex: 1
        }
      }
    }
  }
));

export default Main;
