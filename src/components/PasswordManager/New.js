import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Segment, Container, Header, Form, Input, Button, Icon } from 'semantic-ui-react';
import alertify from 'alertify.js';

/*
* Functions import
*/
import { encrypt } from '../../stores/functions/encryption';
import { generatePassword } from '../../stores/functions/generatePassword';

/*
* Component imports
*/

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



const New = inject("rootStore") ( observer(
  class New extends Component {
    constructor(props){
      super(props);
      //Add a new password window

      /*
      * Expected props
      *   - open: bool
      *       display component or not
      *   - toggleNewWindow: function
      *       toggles window: open and close
      *   - encryptionkey: String
      *       encryption key of the password
      */

      //Stored information
      this.stores = this.props.rootStore.stores;

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.dice = this.dice.bind(this);

      this.state = {
        url: '',
        login: '',
        password: generatePassword(),
        loading: false
      }

      //Styles
      this.styles = this.getStyles();
      this.sheet = jss.createStyleSheet(this.styles);
      const {classes} = this.sheet.attach();
      this.classes = classes;
      //Styles
    }
    

    componentWillReceiveProps(nextProps) {
      if(nextProps.open !== this.props.open) {
        if(nextProps.open && window.innerWidth <= 700) {
          //Scroll to top
          window.scrollTo(0, 0);
        }
        
        //Empty input fields
        this.setState({
          url: '',
          login: '',
          password: generatePassword()
        });
      }
    }


    componentDidUpdate() {
      if(this.props.open && this.state.url === '' && this.state.login === '') {
        document.getElementById('url').focus();
      }
    }


    componentWillUnmount() {
      this.sheet.detach()
    }


    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }


    dice() {
      //Generate a new random password
      
      this.setState({
        password: generatePassword()
      });
    }


    handleSubmit() {
      const url = this.state.url;
      const login = encrypt(this.state.login, this.props.encryptionkey);
      const password = encrypt(this.state.password, this.props.encryptionkey);
      const uid = this.stores.authStore.userData.uid;

      //Update a doc locally with the new values
      const data = {
        url: url,
        login: login,
        password: password,
        time: new Date()
      }

      db.collection("passwords/"+uid+"/passwords").add(data)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alertify.success("Document successfully added!");

        //Add a new doc locally so no new data transfer from firestore
        //is needed
        this.props.addDoc(Object.assign(data, {id:docRef.id}));

        this.props.toggleNewWindow();
        this.setState({
          loading: false
        });
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        alertify.error("Something went wrong! Please check your internet connection");
        this.setState({
          loading: false
        });
      });

      this.setState({
        loading: true
      });
    }


    render() {
      if(this.props.open) {
        return(
          <div className={this.classes.box}>
            <Container text>
              <Segment padded="very">
                <Form onSubmit={this.handleSubmit}>
                  <Header as="h2">
                    Add a password
                  </Header>

                  <Form.Field>
                    <label>Application / URL:</label>
                    <Input 
                      defaultValue={this.state.url} 
                      name="url" 
                      id="url" 
                      onChange={this.handleChange} 
                      type="text" 
                      placeholder="http://alexbell.ninja"
                      required
                     />
                  </Form.Field>

                  <Form.Field>
                    <label>Username / email adress:</label>
                    <Input 
                      defaultValue={this.state.login} 
                      name="login" 
                      onChange={this.handleChange} 
                      type="text" 
                      placeholder="example@example.com"
                      required
                     />
                  </Form.Field>

                  <Form.Field>
                    <label>Password:</label>
                    <Input 
                      value={this.state.password} 
                      name="password" 
                      onChange={this.handleChange} 
                      type="text" 
                      placeholder='********' 
                      label={<Button onClick={this.dice} type="button" icon><Icon name='random' /></Button>} 
                      labelPosition="right" 
                      required
                     />
                  </Form.Field>

                  <p>Login and password are going to be encrypted with the key you have set.</p>

                  <Button loading={this.state.loading} type='submit' primary>Add</Button>
                  <Button loading={this.state.loading} onClick={this.props.toggleNewWindow}><Icon name="x" />Cancel</Button>
                  
                </Form>
              </Segment>
            </Container>
          </div>
        );
      } else {
        return null;
      }
    }


    getStyles() {
      return {
        box: {
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          zIndex: 1000,
          top: 0,
          left: 0,
          backgroundColor: 'rgba(255,255,255,0.9)',
          paddingTop: '5%'
        }
      }
    }
  }
));

export default New;
