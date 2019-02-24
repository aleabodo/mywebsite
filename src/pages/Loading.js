import React, {Component} from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';

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



class Loading extends Component {
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
      <div className={this.classes.loadingContainer}>
        <div className={this.classes.loadingContent}>
          {this.props.children}
        </div>

        <div className={this.classes.loading}>
          <div className={this.classes.loadingCircle}></div>
        </div>
      </div>
    );
  }


  getStyles() {
    return {
      loadingContainer: {
        display: 'block',
        boxSizing: 'border-box',
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white'
      },

      loadingContent: {
        display: 'block',
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      },

      loading: {
        extend: 'loadingContent',
        zIndex: 1
      },

      loadingCircle: {
        width: '40px',
        height: '40px',
        borderRight: 'solid 2px #DA3821',
        borderLeft: 'solid 2px #DA3821',
        borderTop: 'solid 2px transparent',
        borderBottom: 'solid 2px transparent',
        borderRadius: '100%',
        transform: 'rotateZ(0deg)',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        top: 'calc(50vh - 40px)',
        animationName: 'rotate',
        animationDuration: '0.7s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear'
      }
    }
  }
}

export default Loading;
