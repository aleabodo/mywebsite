import React, {Component} from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Container, Segment, Message, Button } from 'semantic-ui-react'

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




class VerifyEmail extends Component {
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


  reload() {
    window.location.reload();
  }


  render() {
    return(
      <div>
        <Container className={this.classes.container}>
          <Segment padded="very">
          <Message warning>
            <Message.Header>Pease verify your email adress</Message.Header>
            <p>Please check your emails and follow the instructions. Check your spam folder if you didn't get it.</p>
            <p>Reload this page after:</p>
            <Button primary onClick={this.reload}>Reload</Button>
          </Message>
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
      }
    }
  }
}

export default VerifyEmail;
