import React from "react"
import FormContainer from "./components/formContainer"
import "./login.css"

const Login = (props) => {
  return (
    <div className="container-fullpage">
      <div className="login-logo"></div>
      <div className="login-form"><FormContainer /></div>
    </div>
  )
}

export default Login