import * as UI from "./action-type";

let defaultState = {
  rootFontSize: "10px",
  rootHeight: "",
}

export const UIData = (state = defaultState, action = {}) => {
  switch(action.type) {
  case UI.CHANGE_ROOT_FONT:
		    return {...state, ...{rootFontSize: action.value, rootHeight: action.height}};
  default:
		    return state;
  }
}
