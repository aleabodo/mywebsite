import React, {Component} from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { Menu, Segment, Dropdown, Table, Button, Icon } from 'semantic-ui-react';

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



class PasswordManager extends Component {
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
      <div>
        <Menu attached='top'>
          <Dropdown item icon='wrench' simple>
            <Dropdown.Menu>
              <Dropdown.Item>
                New
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Menu position='right'>
            <div className='ui right aligned category search item'>
              <div className='ui transparent icon input'>
                <input className='prompt' type='text' placeholder='Search...' />
                <i className='search link icon' />
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
              <Table.Row>
                <Table.Cell>cell</Table.Cell>
                <Table.Cell>cell</Table.Cell>
                <Table.Cell>
                  <Button icon>
                    <Icon name='copy' />
                  </Button>
                </Table.Cell>
                <Table.Cell>cell</Table.Cell>
                <Table.Cell>
                  <Button icon>
                    <Icon name='copy' />
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </div>
    );
  }


  getStyles() {
    return {

    }
  }
}

export default PasswordManager;
