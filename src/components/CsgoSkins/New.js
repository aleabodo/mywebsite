import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Segment, Container, Header, Form, Button, Icon } from 'semantic-ui-react';
import alertify from 'alertify.js';

/*
* Functions import
*/

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



const New = inject("rootStore")(observer(
  class New extends Component {
    constructor(props) {
      super(props);
      //Add a new password window

      /*
      * Expected props
      *   - toggleNewWindow: function
      *       toggles window: open and close
      *   - addDoc: function
      *       adds a new doc locally
      */

      //Stored information
      this.stores = this.props.rootStore.stores;

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
        item: '',
        baughtfor: 0,
        status: 0,
        soldfor: 0,
        loading: false
      }

      //Styles
      this.styles = this.getStyles();
      this.sheet = jss.createStyleSheet(this.styles);
      const { classes } = this.sheet.attach();
      this.classes = classes;
      //Styles

      this.options = [
        {
          key: 0,
          text: 'Owned',
          value: 0
        },
        {
          key: 1,
          text: 'Pending',
          value: 1
        },
        {
          key: 2,
          text: 'Sold',
          value: 2
        }
      ]
    }

    componentDidMount() {
      document.getElementById('item').focus();
    }


    componentWillUnmount() {
      this.sheet.detach();
    }


    handleChange(e, { value, name }) {
      if(name == 'boughtfor' || name == 'soldfor') {
        value = parseFloat(value);
      }
      this.setState({
        [name]: value
      });
    }


    handleSubmit() {
      //Update a doc locally with the new values
      const data = {
        item: this.state.item,
        boughtfor: this.state.boughtfor,
        soldfor: this.state.soldfor,
        status: this.state.status,
        time: new Date()
      }

      db.collection("csgoskins/" + this.stores.authStore.userData.uid + "/csgoskins").add(data)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          alertify.success("Item added!");

          //Add a new doc locally so no new data transfer from firestore
          //is needed
          this.props.addDoc(Object.assign(data, { id: docRef.id }));

          this.props.toggleNewWindow();
          this.setState({
            loading: false
          });
        })
        .catch(function (error) {
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
      return (
        <div className={this.classes.box}>
          <Container text>
            <Segment padded="very">
              <Form onSubmit={this.handleSubmit}>
                <Header as="h2">
                  Add new item
                </Header>

                <Form.Group>
                  <Form.Input
                    label="Item name"
                    name="item"
                    id="item"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="AWP | Containment Breach"
                    required
                    width={10}
                    autoComplete="off"
                  />

                  <Form.Select
                    label="Status"
                    placeholder='Select status'
                    name="status"
                    id="status"
                    onChange={this.handleChange}
                    fluid
                    value={this.state.status}
                    options={this.options}
                    required
                    width={6}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Input
                    pattern="[1-9][0-9]*(\.[0-9]{1,2}){0,1}"
                    label="Bought for"
                    icon="euro"
                    name="boughtfor"
                    id="boughtfor"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="3.87"
                    required
                    width={8}
                    autoComplete="off"
                  />

                  <Form.Input
                    pattern="[1-9][0-9]*(\.[0-9]{1,2}){0,1}"
                    label="Sold for"
                    icon="euro"
                    name="soldfor"
                    id="soldfor"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="4.22"
                    required={!this.state.status == 0}
                    disabled={this.state.status == 0}
                    width={8}
                    autoComplete="off"
                  />
                </Form.Group>

                <Button loading={this.state.loading} type='submit' primary>Add</Button>
                <Button loading={this.state.loading} onClick={this.props.toggleNewWindow}><Icon name="x" />Cancel</Button>

              </Form>
            </Segment>
          </Container>
        </div>
      );
    }


    getStyles() {
      return {
        box: {
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          zIndex: 3,
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
