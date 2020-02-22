import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Segment, Container, Form, Input, Button, Icon } from 'semantic-ui-react';
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



const Edit = inject("rootStore") ( observer(
  class Edit extends Component {
    constructor(props){
      super(props);
      //Update an existing document

      /*
      * Expected props
      *   - toggleEditWindow: function
      *       toggles window: open and close
      *   - updateDoc: function
      *       updates doc locally
      *   - deleteDoc: function
      *       deletes doc locally
      *   - editIndex: Int
      *       index of array with all docs. locale
      *   - data: []
      *       all local doc data. data[editIndex] is the doc, that is to be edited
      */

      //Stored information
      this.stores = this.props.rootStore.stores;

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.delete = this.delete.bind(this);

      this.state = {
        item: this.props.data[this.props.editIndex].item,
        status: this.props.data[this.props.editIndex].status,
        boughtfor: this.props.data[this.props.editIndex].boughtfor,
        soldfor: this.props.data[this.props.editIndex].soldfor
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
      this.setState({
        [e.target.name]: e.target.value
      });
    }


    delete() {
      //Delete doc

      alertify.confirm("Are you sure?", () => {
        db.collection("csgoskins/" + this.stores.authStore.userData.uid + "/csgoskins").doc(this.props.data[this.props.editIndex].id).delete().then(() => {
          //Delete doc locally
          this.props.deleteDoc(this.props.editIndex);

          this.props.toggleEditWindow();
          
          alertify.success("Document removed!");
          this.setState({
            loading: false
          });
        }).catch((error) => {
          console.error("Error updating the document: ", error);
          alertify.error("Something went wrong! Please check your internet connection");
          this.setState({
            loading: false
          });
        });

        this.setState({
          loading: true
        });
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

      const id = this.props.data[this.props.editIndex].id;

      db.collection("csgoskins/" + this.stores.authStore.userData.uid + "/csgoskins").doc(id).set(data)
      .then(() => {
        console.log("Document updated");
        alertify.success("Document updated!");

        //Update a doc locally with the new values
        this.props.updateDoc(Object.assign(data, {id:id}), this.props.editIndex);

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
      return(
        <div className={this.classes.box}>
          <Container text>
            <Segment padded="very">
              <Form onSubmit={this.handleSubmit}>
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
                    defaultValue={this.props.data[this.props.editIndex].item}
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
                    defaultValue={this.props.data[this.props.editIndex].status}
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
                    defaultValue={this.props.data[this.props.editIndex].boughtfor}
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
                    required={!this.state.status==0}
                    disabled={this.state.status==0}
                    width={8}
                    defaultValue={this.props.data[this.props.editIndex].soldfor}
                    autoComplete="off"
                  />
                </Form.Group>

                <Button loading={this.state.loading} type='submit' primary>Update</Button>
                <Button loading={this.state.loading} type="button" onClick={this.props.toggleEditWindow}><Icon name="x" />Cancel</Button>

                <br />
                <br />

                <Button loading={this.state.loading} type="button" onClick={this.delete} icon color="red"><Icon name="trash alternate" /></Button>
                
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

export default Edit;
