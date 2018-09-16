import React, {Component} from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Segment, Container, Header, Form, Input, Button, Icon } from 'semantic-ui-react';

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

    this.state = {
      url: '',
      login: '',
      password: this.generatePassword(),
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
      this.setState({
        url: '',
        login: '',
        password: this.generatePassword()
      });
    }
  }


  componentWillUnmount() {
    this.sheet.detach()
  }


  generatePassword() {
      //Creates a unique id for each chat bubble so that the animation can be triggered
    
      var random = "";
      var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP0123456";
    
      for (var i = 0; i < 16; i++)
        random += possible.charAt(Math.floor(Math.random() * possible.length));
    
      while(true) {
        if(!document.getElementById(random)) {
          return random;
        }
      }
  }


  handleChange(e, {name}) {
    this.setState({
      [name]: e.target.value
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
                  <Input iconPosition='left' placeholder='http://exmple.com'>
                    <input value={this.state.url} type="text" name="url" onChange={this.handleChange} autoComplete="off" required />
                  </Input>
                </Form.Field>

                <Form.Field>
                  <label>Username / email adress:</label>
                  <Input iconPosition='left' placeholder='example@example.com'>
                    <input value={this.state.login} type="text" name="login" onChange={this.handleChange} autoComplete="off" required />
                  </Input>
                </Form.Field>

                <Form.Field>
                  <label>Password:</label>
                  <Input iconPosition='left' placeholder='********'>
                    <input value={this.state.password} type="text" name="password" onChange={this.handleChange} autoComplete="off" required />
                  </Input>
                </Form.Field>

                <p>The encryption key for this entry is '<b>{this.props.encryptionkey}</b>'</p>

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

export default New;
