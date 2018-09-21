import React, { Component } from "react";
import "./css/App.scss";
import { connect } from "react-redux";
import { changeRootFont } from "store/UI/action";
import AppRouter from "./router/index";



class App extends Component {
  constructor(props) {
    super(props);
    window.onresize = this.setHtmlFontSize;
    this.setHtmlFontSize();
  }
  componentWillMount() {
  }
  setHtmlFontSize = () => {
    let html = document.documentElement;
    let height = html.clientHeight;
    let bodyWidth = html.clientWidth;
    // let bodyHeight = html.clientWidth * (1080 / 1920);
    // if (bodyHeight > html.clientHeight) {
    //   bodyHeight = html.clientHeight
    //   bodyWidth = bodyHeight / (1080 / 1920)
    // }
    let fontSize = 100 * (bodyWidth / 1920);
    if (fontSize >= 62.5) {
      html.style.fontSize = fontSize + "px";
    } else {
      html.style.fontSize = "62.5px"
    }
   
    // document.querySelector("#root").style.minHeight = bodyHeight + "px";
    // document.querySelector("#root").style.width = bodyWidth + "px";
    this.props.changeRootFont(fontSize, height);
  }
  componentDidMount() {

  }
  render() {
    return (
        <AppRouter />
    )
  }
}

export default connect(state => ({

}), {
    changeRootFont,
  })(App);