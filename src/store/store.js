import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import * as UI from "./UI/reducer";
import * as sentimentAnalysis from "./sentimentAnalysis/reducer";
import * as login from "./login/reducer";
import * as mapData from "./map/reducer";

// let store = createStore(
// 	combineReducers({ ...pollutionMonitor, ...UI, ...globalWidget, ...sentimentAnalysis}),
// 	applyMiddleware(thunk)
// );

let store;

if(!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
  store = createStore(
    combineReducers({ ...UI, ...sentimentAnalysis, ...login, ...mapData}),
    applyMiddleware(thunk)
  );
}
else {
  store = createStore(
    combineReducers({...UI, ...sentimentAnalysis, ...login, ...mapData}),
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) 
  );

}

export default store;