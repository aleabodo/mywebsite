import React, {Component} from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Menu, Segment, Dropdown, Table, Button, Icon, Header } from 'semantic-ui-react';
import alertify from 'alertify.js';

/*
* Functions import
*/

/*
* Component imports
*/
import New from './New';

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



class PasswordManager extends Component {
  constructor(props){
    super(props);
    //Password Manager page

    /*
    * Expected props
    *   - /
    */

    this.toggleNewWindow = this.toggleNewWindow.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);

    this.state = {
      newWindowOpen: false,
      key: '',
      search: ''
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


  onChangeInput(e) {
    //Encryption key and search input

    this.setState({
      [e.target.name]: e.target.value
    });
  }


  toggleNewWindow() {
    //Add new password window

    if(this.state.key !== '')
    {
      alertify.log("Encryption key: '" + this.state.key + "'");
      this.setState({
        newWindowOpen: !this.state.newWindowOpen
      });
    } else {
      alertify.error("Please set an encryption key!");
    }
  }


  render() {
    return(
      <div>
        <New encryptionkey={this.state.key} open={this.state.newWindowOpen} toggleNewWindow={this.toggleNewWindow} />
        <Menu attached='top'>
          <Dropdown item icon='wrench' simple>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.toggleNewWindow}>
                New
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Menu position='right'>
            <div className='ui right aligned category search item'>
              <div className='ui transparent icon input'>
                <input className='prompt' type='text' placeholder='Encryption key...' name="key" onChange={this.onChangeInput} autoComplete="off" />
                <i className='key icon' />
              </div>
            </div>

            <div className='ui right aligned category search item'>
              <div className='ui transparent icon input'>
                <input className='prompt' type='text' placeholder='Search...' name="search" onChange={this.onChangeInput} autoComplete="off" />
                <i className='search icon' />
              </div>
            </div>
          </Menu.Menu>
        </Menu>

        <Segment attached='bottom'>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={4}>Application / URL</Table.HeaderCell>
                <Table.HeaderCell width={5}>Username / Email adress</Table.HeaderCell>
                <Table.HeaderCell width={1}>Copy</Table.HeaderCell>
                <Table.HeaderCell width={5}>Password</Table.HeaderCell>
                <Table.HeaderCell width={1}>Copy</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>cell</Table.Cell>
                <Table.Cell>cell</Table.Cell>
                <Table.Cell>
                  <Button icon>
                    <Icon name='copy' />
                  </Button>
                </Table.Cell>
                <Table.Cell>cell</Table.Cell>
                <Table.Cell>
                  <Button icon>
                    <Icon name='copy' />
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>

        <Header as="h3">
          How does it work?
        </Header>
        <p>
          I ask you to give an encryption key. Once you set that key you can create a new password which is then encrypted with that key.
        </p>
        <p>
          The password is then saved in the encrypted form on the database in the internet, which means that nobody (not even me) can read your password unless that person knows the key. In other words: <b>The password is completely safe and solely accessible by you and only you!</b>
        </p>
        <p>
          To decrypt your passwords simply type in the encryption key and all your passwords in your list are displayed correctly and readable in the form you had set them.
        </p>
        <hr />
        <p>
          I advise you to choose one encryption key and use it for all your passwords in your list. Why? Using the same key makes decrypting easier for you because <b>all</b> entries are being decrypted correctly at the same time by using one single key.
        </p>
      </div>
    );
  }


  getStyles() {
    return {

    }
  }
}

export default PasswordManager;
