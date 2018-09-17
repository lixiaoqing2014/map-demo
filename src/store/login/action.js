import * as login from "./action-type"

export const formSubmit = (payload) => ({
  type: login.FORM_SUBMIT,
  payload
})