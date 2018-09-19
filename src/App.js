import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./css/App.scss";
import { connect } from "react-redux";
import { changeRootFont } from "store/UI/action";
import login from "pages/login/login";
import index from "pages/index/index";
import environmentMonitor from "pages/environmentMonitor/index";
import originalList from "pages/originalList/index";
import sceneLookforecast from "pages/sceneLookforecast/index"
import totalReport from "pages/totalReport/index"
import totalDevelop from "pages/totalDevelop/index"
import Header from "components/header/header";

class App extends Component {
  constructor(props) {
    super(props);
    window.onresize = this.setHtmlFontSize;
    this.setHtmlFontSize();
  }
  componentWillMount(){
     }
  setHtmlFontSize = () =>  {
    let html = document.documentElement;
    let height = html.clientHeight;
    let bodyWidth = html.clientWidth;
    let bodyHeight = html.clientWidth * (1080 / 1920);
    if (bodyHeight > html.clientHeight) {
      bodyHeight = html.clientHeight
      bodyWidth = bodyHeight / (1080 / 1920)
    }
    let fontSize = 100 * (bodyWidth / 1920);
    html.style.fontSize = fontSize + "px";
    document.querySelector("#root").style.minHeight = bodyHeight + "px";
    // document.querySelector("#root").style.width = bodyWidth + "px";
    this.props.changeRootFont(fontSize, height);
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>

          <Header>
            <Route path="/index" exact component={index} />
            <Route path="/environmentMonitor" exact component={environmentMonitor} />
            <Route path="/originalList" exact component={originalList} />
            <Route path="/sceneLookforecast" exact component={sceneLookforecast} />
            <Route path="/totalReport" exact component={totalReport} />
            <Route path="/totalDevelop" exact component={totalDevelop} />
            <Redirect to="/index"/>
          </Header>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(state => ({
 
}), {
  changeRootFont,
})(App);