import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Segment, Container, Form, Input, Button, Icon } from 'semantic-ui-react';
import alertify from 'alertify.js';

/*
* Functions import
*/
import { encrypt, decrypt } from '../../stores/functions/encryption';
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



const Edit = inject("rootStore") ( observer(
  class Edit extends Component {
    constructor(props){
      super(props);
      //Update an existing document

      /*
      * Expected props
      *   - open: bool
      *       display component or not
      *   - toggleEditWindow: function
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
        password: '',
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
        var url;
        var login;
        var password;
        if(nextProps.open) {
          if(window.innerWidth <= 700) {
            //Scroll to top
            window.scrollTo(0, 0);
          }

          url = nextProps.data[nextProps.editIndex].url;
          login = decrypt(nextProps.data[nextProps.editIndex].login, nextProps.encryptionkey);
          password = decrypt(nextProps.data[nextProps.editIndex].password, nextProps.encryptionkey);
        } else {
          url = null;
          login = null;
          password = null;
        }

        //Empty input fields
        this.setState({
          url: url,
          login: login,
          password: password
        });
      }
    }


    componentDidUpdate() {
      
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
      const id = this.props.data[this.props.editIndex].id;
      const editIndex = this.props.editIndex;

      //Update a doc locally with the new values
      const data = {
        url: url,
        login: login,
        password: password,
        time: new Date()
      }

      db.collection("passwords/"+uid+"/passwords").doc(id).set(data)
      .then(() => {
        console.log("Document updated");
        alertify.success("Document successfully updated!");

        //Update a doc locally with the new values
        this.props.updateDoc(Object.assign(data, {id:id}), editIndex);

        this.props.toggleEditWindow();
        this.setState({
          loading: false
        });
      })
      .catch(function(error) {
        console.error("Error updating the document: ", error);
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
        const url = this.state.url;
        const login = this.state.login;
        const password = this.state.password;

        return(
          <div className={this.classes.box}>
            <Container text>
              <Segment padded="very">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Application / URL:</label>
                    <Input 
                      defaultValue={url} 
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
                      defaultValue={login} 
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
                      value={password} 
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

                  <Button loading={this.state.loading} type='submit' primary>Update</Button>
                  <Button loading={this.state.loading} onClick={this.props.toggleEditWindow}><Icon name="x" />Cancel</Button>
                  
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

export default Edit;
