import * as login from "./action-type"

let defaultState = {
  loginType: 0,
  username: "",
  password: "",
  keepAccount: true
}

export const loginData = (state=defaultState, action={}) => {
  switch(action.type) {
  case login.FORM_SUBMIT:
    return {...state, ...action.payload}

  default:
    return state
  }
}