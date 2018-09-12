import React, {Component} from 'react';
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



class Login extends Component {
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
      <Container className={this.classes.container}>
        <Segment padded="very">
          <Form>
            <Header as="h1">
              Sign in
            </Header>

            <Form.Field>
              <label>Email adress:</label>
              <Input iconPosition='left' placeholder='example@example.com'>
                <Icon name='at' />
                <input type="email" />
              </Input>
            </Form.Field>

            <Form.Field>
              <label>Password:</label>
              <input type="password" placeholder='*******' />
            </Form.Field>

            <Button type='submit'>Next</Button>
          </Form>
        </Segment>
      </Container>
    );
  }


  getStyles() {
    return {
      container: {
        padding: '20%',
        paddingTop: '10%'
      }
    }
  }
}

export default Login;
