import React, { Component } from 'react';

import logo from "../files/images/logo.svg";


class PageLoading extends Component {
  constructor(props) {
    super(props);

    /*
    * Expected props:
    *   /
    */

    this.state = {
      display: true
    }
  }

  componentWillUnmount() {

  }

  componentDidMount() {
    //Color background
    this.interval1 = setInterval(function () {
      document.getElementById("PageLoading").style.backgroundColor = "transparent";
    },1100);

    //remove Logo
    this.interval2 = setInterval(function () {
      document.getElementById("PageLoading_Logo").classList.add("PageLoading_Logo-fadeOut");
    },2500);

    //Unmount
    this.interval3 = setInterval(() => {
      clearInterval(this.interval1);
      clearInterval(this.interval2);
      clearInterval(this.interval3);
      this.setState({
        display: false
      });
    },5500);
  }

  render() {
    //<div className="pageLoadingLogo"></div>
    const url = logo + '?' + Math.random();

    if(this.state.display) {
      return(
        <div className="PageLoading" id="PageLoading">
          <img className="PageLoading_Logo" id="PageLoading_Logo" alt="" src={url} />

          <div className="PageLoading_left PageLoading_1 PageLoading_Element"></div>
          <div className="PageLoading_right PageLoading_1 PageLoading_Element"></div>

          <div className="PageLoading_left PageLoading_2 PageLoading_Element"></div>
          <div className="PageLoading_right PageLoading_2 PageLoading_Element"></div>

          <div className="PageLoading_left PageLoading_3 PageLoading_Element"></div>
          <div className="PageLoading_right PageLoading_3 PageLoading_Element"></div>

          <div className="PageLoading_left PageLoading_4 PageLoading_Element"></div>
          <div className="PageLoading_right PageLoading_4 PageLoading_Element"></div>

          <div className="PageLoading_left PageLoading_5 PageLoading_Element"></div>
          <div className="PageLoading_right PageLoading_5 PageLoading_Element"></div>
        </div>
      );
    } else {
      return(null);
    }
  }
}

export default PageLoading;
