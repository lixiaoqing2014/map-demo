import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./css/App.scss";
import { connect } from "react-redux";
import { changeRootFont } from "store/UI/action";
import sentimentAnalysis from "pages/sentimentAnalysis/sentimentAnalysis";
import login from "pages/login/login";
import Header from "components/header/header";

// const pollutionMonitor = asyncComponent(() => import("pages/pollutionMonitor/pollutionMonitor"));
// const envMonitor = asyncComponent(() => import("pages/envMonitor/envMonitor"));
// const sentimentAnalysis = asyncComponent(() => import("pages/sentimentAnalysis/sentimentAnalysis"));
// const factoryRecord = asyncComponent(() => import("pages/factoryRecord/factoryRecord"));
// const resourceCategory = asyncComponent(() => import("pages/resourceCategory/resourceCategory"));
// const comprehensiveAnalysis = asyncComponent(() => import("pages/comprehensiveAnalysis/comprehensiveAnalysis"));
// const login = asyncComponent(() => import("pages/login/login"));

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
          <Route path="/" exact component={login} />
          <Header>
            <Route path="/concensus" exact component={sentimentAnalysis} />
            {/*<Route path="/record" render={() =>*/}
              {/*<Switch>*/}
                {/*<Route path="/record" exact component={factoryRecord}/>*/}
                {/*<Route path="/record/check/:id?" exact component={CheckModule}/>*/}
                {/*<Route path="/record/edit/:id?" exact component={EditModule}/>*/}
              {/*</Switch>*/}
            {/*} />*/}
            {/*<Route path="/resource" exact component={resourceCategory} />*/}
          </Header>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(state => ({
 
}), {
  changeRootFont,
})(App);