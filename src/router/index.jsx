import React from "react";

import login from "../view/login/login";
import index from "../view/index/index";
import environmentMonitor from "../pages/environmentMonitor/index";
import originalList from "../pages/originalList/index";
import sceneLookforecast from "../pages/sceneLookforecast/index"
import totalReport from "../pages/totalReport/index"
import totalDevelop from "../pages/totalDevelop/index"
import Header from "../components/header/header";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";


const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Header>
                <Route path="/" exact component={login} />
                <Route path="/index" exact component={index} />
            </Header>
        </Switch>
    </BrowserRouter>
)

export default AppRouter