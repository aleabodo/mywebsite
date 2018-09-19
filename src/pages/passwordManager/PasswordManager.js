import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Menu, Segment, Dropdown, Table, Button, Loader, Icon, Header, Input } from 'semantic-ui-react';
import alertify from 'alertify.js';

/*
* Functions import
*/
import { decrypt } from '../../stores/functions/encryption';

/*
* Component imports
*/
import New from './New';
import Headline from '../../components/Headline';

jss.setup(preset());

//Firebase
var firebase = require('../../stores/fb').fb;
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();


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



const PasswordManager = inject("rootStore") ( observer(
  class PasswordManager extends Component {
    constructor(props){
      super(props);
      //Password Manager page

      /*
      * Expected props
      *   - /
      */

      //Stored information
      this.stores = this.props.rootStore.stores;

      this.toggleNewWindow = this.toggleNewWindow.bind(this);
      this.onChangeInput = this.onChangeInput.bind(this);

      this.state = {
        newWindowOpen: false,
        key: '',
        search: '',
        data: [],
        loading: true
      }

      //Styles
      this.styles = this.getStyles();
      this.sheet = jss.createStyleSheet(this.styles);
      const {classes} = this.sheet.attach();
      this.classes = classes;
      //Styles
    }


    componentDidMount() {
      this.fetchData();
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
      //Open window to add a new password doc

      if(this.state.key !== '')
      {
        this.setState({
          newWindowOpen: !this.state.newWindowOpen
        });
      } else {
        alertify.error("Please set an encryption key!");
      }
    }


    fetchData() {
      //Gets password list from firestore and
      //Writes in this.state

      const uid = this.stores.authStore.userData.uid;

      db.collection("passwords").where("uid", "==", uid).orderBy("time", "desc").get().then((querySnapshot) => {
        var arr = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
           arr.push(data);
        });
        this.setState({
          data: arr,
          loading: false
        });
      });
    }


    displayData(dataList) {
      //Returns array with all table row components
      var components = [];
      
      dataList.forEach((element, index) => {
        components.push(
          <Table.Row key={index}>
            <Table.Cell>{element.url}</Table.Cell>
            <Table.Cell>{decrypt(element.login, this.state.key)}</Table.Cell>
            <Table.Cell>
              <Button icon>
                <Icon name='copy' />
              </Button>
            </Table.Cell>
            <Table.Cell>{decrypt(element.password, this.state.key)}</Table.Cell>
            <Table.Cell>
              <Button icon>
                <Icon name='copy' />
              </Button>
            </Table.Cell>
          </Table.Row>
        );
      });

      return components;
    }


    render() {
      const tableRows = this.displayData(this.state.data)

      return(
        <div>
          <New encryptionkey={this.state.key} open={this.state.newWindowOpen} toggleNewWindow={this.toggleNewWindow} />

          <Headline black="Password " red="manager" />

          <Input icon placeholder='Search...'>
            <input type='text' placeholder='Search...' name="search" onChange={this.onChangeInput} autoComplete="off" />
            <Icon name='search' />
          </Input>

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
                {tableRows}
              </Table.Body>
            </Table>
            <Loader active={this.state.loading} />
          </Segment>

          <Header as="h3">
            How does it work? Is it safe?
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
            <b>I advise you to choose one encryption key and use it for all your passwords in your list.</b> Why? Using the same key makes decrypting easier for you because <b>all</b> entries are being decrypted correctly at the same time by using one single key.
          </p>
        </div>
      );
    }


    getStyles() {
      return {

      }
    }
  }
));

export default PasswordManager;
