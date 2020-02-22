import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Menu, Segment, Dropdown, Table, Loader, Icon, Input, Button } from 'semantic-ui-react';
import alertify from 'alertify.js';

/*
* Functions import
*/

/*
* Component imports
*/
import New from '../../components/CsgoSkins/New';
import Edit from '../../components/CsgoSkins/Edit';
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



const CsgoSkins = inject("rootStore") ( observer(
  class CsgoSkins extends Component {
    constructor(props){
      super(props);
      //Csgo skins page

      /*
      * Expected props
      *   - /
      */

      //Stored information
      this.stores = this.props.rootStore.stores;

      this.toggleNewWindow = this.toggleNewWindow.bind(this);
      this.onChangeInput = this.onChangeInput.bind(this);
      this.addDoc = this.addDoc.bind(this);

      this.state = {
        loading: true,
        data: [],
        search: '',
        newWindowOpen: false,
        editWindowOpen: false
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
      //input changes, including search

      this.setState({
        [e.target.name]: e.target.value
      });
    }


    toggleNewWindow() {
      //Open window to add a new doc

      this.setState({
        newWindowOpen: !this.state.newWindowOpen
      });
    }


    toggleEditWindow(index) {
      //Open window to add a new password doc

      this.setState({
        editWindowOpen: !this.state.editWindowOpen,
        editIndex: index
      });
    }


    addDoc(data) {
      //Add a new doc locally so no new data transfer from firestore
      //is needed
      var newArr = [];
      newArr[0] = data;
      newArr = newArr.concat(this.state.data);
      this.setState({
        data: newArr
      });
    }


    updateDoc(data, editIndex) {
      //Update a doc locally with the new values
      var newArr = this.state.data;
      newArr[editIndex] = data;
      this.setState({
        data: newArr
      });
    }


    deleteDoc(editIndex) {
      //Delete doc locally

      var newArr = [];
      this.state.data.forEach(function(element, index) {
        if(index !== editIndex) {
          newArr.push(element);
        }
      });
      this.setState({
        data: newArr
      });
    }


    fetchData() {
      //Gets item list from firestore and
      //Writes in this.state

      const uid = this.stores.authStore.userData.uid;

      db.collection("csgoskins/"+uid+"/csgoskins").orderBy("status", "asc").get().then((querySnapshot) => {
        var arr = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          arr.push(Object.assign(data, {id:doc.id}));
        });
        this.setState({
          data: arr,
          loading: false
        });
      }).catch(function() {
        alertify.error("Data could not be loaded. Please check your internet connection");
      });
    }


    displayData(dataList) {
      //Returns array with all table row components
      var components = [];

      var toggleEditWindow = () => {};
      var soldfor;
      var status;
      var diff;
      var diffComponent;

      dataList.forEach((element, index) => {
        if(element.item.toLowerCase().includes(this.state.search.toLowerCase())) {
          toggleEditWindow = () => {
            this.toggleEditWindow(index);
          }

          //Generate literal status from numerical status
          soldfor = element.status != 0 ? element.soldfor : '-';
          status = {
            0: <span style={{color: '#00a2ff'}}>Owned</span>, 
            1: <span style={{color: '#ff5e00'}}>Pending</span>, 
            2: <span style={{color: '#9d00ff'}}>Sold</span>
          }[element.status];

          //View win under soldfor
          diff = Math.round((element.soldfor-element.boughtfor)*100)/100;
          diffComponent = null;
          if(element.status == 2) {
            if(diff > 0) {
              diffComponent = <div style={{color: 'green'}}>+ {diff}</div>;
            } else if(diff < 0) {
              diffComponent = <div style={{color: 'red'}}>- {-diff}</div>;
            } else {
              diffComponent = <div>+/- 0</div>;
            }
          }

          components.push(
            <Table.Row key={index}>
             <Table.Cell>
                { /*element.status != 2 ? <Button icon onClick={toggleEditWindow}>
                  <Icon name='edit' />
          </Button> : null */}
              </Table.Cell>
              <Table.Cell>{element.item}</Table.Cell>
              <Table.Cell>{element.boughtfor}</Table.Cell>
              <Table.Cell>
                {soldfor}
                {diffComponent}
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>{status}</Table.Cell>
            </Table.Row>
          );
        }
      });

      return components;
    }


    render() {
      const tableRows = this.displayData(this.state.data);

      //Calculate the total win/loss
      var totalDiff = 0;
      var totalDiffComponent;
      this.state.data.forEach((value) => {
        if(value.status == 2) {
          totalDiff += value.soldfor;
          totalDiff -= value.boughtfor;
        }
      });
      totalDiff = Math.round(totalDiff*100)/100
      if(totalDiff > 0) {
        totalDiffComponent = <div style={{color: 'green'}}>+ {totalDiff}</div>;
      } else if(totalDiff < 0) {
        totalDiffComponent = <div style={{color: 'red'}}>- {-totalDiff}</div>;
      } else {
        totalDiffComponent = <div>+/- 0</div>;
      }

      return(
        <div>
          { this.state.newWindowOpen ? <New addDoc={this.addDoc} toggleNewWindow={this.toggleNewWindow} /> : null }
          { this.state.editWindowOpen ? <Edit  toggleNewWindow={this.toggleNewWindow} /> : null }

          <Headline black="Csgo " red="skins" />

          <Input 
            icon 
            placeholder='Search...'
            type='text' 
            id="search" 
            name="search" 
            onChange={this.onChangeInput}
            iconPosition='left'
            transparent
            autoComplete="off"
           >
            <Icon name='search' />
            <input />
          </Input>

          <Menu attached='top'>
            <Dropdown item icon='wrench' simple>
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.toggleNewWindow}>
                  New
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu>

          
          <Segment attached='bottom'>
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={1}></Table.HeaderCell>
                  <Table.HeaderCell width={3}>Item</Table.HeaderCell>
                  <Table.HeaderCell width={3}>Bought for</Table.HeaderCell>
                  <Table.HeaderCell width={3}>
                    Sold for
                    {totalDiffComponent}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={3}>Market price</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {tableRows}
              </Table.Body>
            </Table>
            <Loader active={this.state.loading} />
          </Segment>
        </div>
      );
    }


    getStyles() {
      return {

      }
    }
  }
));

export default CsgoSkins;
