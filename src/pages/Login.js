import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Container, Button, Form, Header, Segment, Input, Icon } from 'semantic-ui-react'

/*
* Functions import
*/

/*
* Component imports
*/
import LoadingPage from '../components/loadingPage';
import Headline from '../components/Headline';

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



const Login = inject("rootStore") ( observer(
  class Login extends Component {
    constructor(props){
      super(props);
      //Initial loading screen

      /*
      * Expected props
      *   - /
      */

      //Stored information
      this.stores = this.props.rootStore.stores;

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
        email: '',
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


    componentWillUnmount() {
      this.sheet.detach()
    }


    handleChange(e) {
      const value = e.target.value;
      const name = e.target.name;

      this.setState({
        [ name ]: value 
      });
    }


    handleSubmit() {
      const email = this.state.email;
      const password = this.state.password;

      this.stores.authStore.signIn(email, password).then(() => {
        //Don't stop loading! Component already unmounted by then

      }).catch((error) => {
        console.log(error);
        //Stop loading
        this.setState({
          loading: false
        });
      });

      //Initialize loading
      this.setState({
        loading: true
      });
    }


    render() {
      return(
        <div>
          <LoadingPage />
          <Container className={this.classes.container}>
            <Segment padded="very">
              <Form onSubmit={this.handleSubmit}>
                <Header as="h1">
                  Sign in / up
                </Header>

                <Form.Field>
                  <label>Email adress:</label>
                  <Input iconPosition='left' placeholder='example@example.com'>
                    <Icon name='at' />
                    <input type="email" name="email" onChange={this.handleChange} autoComplete="off" required />
                  </Input>
                </Form.Field>

                <Form.Field>
                  <label>Password:</label>
                  <input type="password" name="password" onChange={this.handleChange} placeholder='**********' autoComplete="off" required />
                </Form.Field>

                <Button loading={this.state.loading} type='submit'>Go!</Button>
              </Form>
            </Segment>

            <Segment padded="very">
              <Headline black="Password " red="manager" />
              <ul>
                <li>
                  Keep your passwords <b>organized</b> and access them
                  from <b>every device</b>
                </li>
                <li>
                  Sophisticated database access permissions and <b>client side encryption and decryption</b> make your password list readable only to you, even in the unlikely event that the software gets hacked!
                </li>
                <li>
                  <b>Search</b> in your password list
                </li>
                <li>
                  Automatic <b>password generator</b>
                </li>
                <li>
                  <b>Copy</b> the password by just one button click
                </li>
                <br />
                <li>
                  <b>For nerds: </b><a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard" target="_blank" rel="noopener noreferrer">AES (Rijndael cipher) </a>
                  encrypted with a 128 bits key, 10 rounds and a blocksize of 128 bits. Established by the U.S. NIST in 2001 and approved by the NSA for "top secret" information.
                </li>
              </ul>
              <img alt="" className={this.classes.ninja} src={require('../files/images/ninja.svg')} />
            </Segment>
          </Container>
        </div>
      );
    }


    getStyles() {
      return {
        container: {
          padding: '0%',
          paddingTop: '15%',
          '@media (min-width: 500px)': {
            padding: '20%',
            paddingTop: '10%',
          }
        },

        ninja: {
          width: '100px',
          marginBottom: '-47px',
          marginTop: '30px',
          marginLeft: '20px'
        }
      }
    }
  }
));

export default Login;
