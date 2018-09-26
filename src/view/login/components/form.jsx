import React, {Component} from "react"
// import {widthRouter} from 'react-router-dom'
import { withRouter } from "react-router-dom";
import Field from "./field"

const USER_CONFIG_0 = {
  username: "daping01",
  password: "daping01",
};
const USER_CONFIG_1 = {
  username: "pc01",
  password: "pc01",
};
const USER_CONFIG = [ USER_CONFIG_0, USER_CONFIG_1 ];

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginType: props.loginType,
      username: "",
      password: "",
      keepAccount: props.keepAccount,
      validateText: ""
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.loginType !== this.props.loginType) {
      this.setState({
        loginType: nextProps.loginType,
        username: "",
        password: ""
      })
    }
    if(nextProps.keepAccount !== this.props.keepAccount) {
      this.setState({keepAccount: nextProps.keepAccount})
    }
  }

  onChange(key, value) {
    this.setState({[key]: value})
  }

  static validate (usr, pwd, type) {
    let validate = { status: false, text: "" };
    if(usr === "") {
      validate.text = "账号不能为空";
    }
    else if(pwd === "") {
      validate.text = "密码不能为空";
    }
    else {
      validate.status = USER_CONFIG[type].username === usr && USER_CONFIG[type].password === pwd;
      validate.text = validate.status ? "" : "账号密码错误，请重新输入";
    }

    return validate
  }

  routerDispatch(type) {
    switch(type) {
    case 0:
      window.location.href = "http://101.89.80.148/"
      break
    case 1:
      this.props.history.push("/index")
      break
    }
  }

  onSubmit(ev) {
    ev.preventDefault()
    const {onSubmit} = this.props
    const {loginType, username, password, keepAccount} = this.state
    let payload = {
      loginType,  username,  password,  keepAccount
    }
    let validate = Form.validate(username, password, loginType)
    this.setState({validateText: validate.text})
    if(validate.status) {
      onSubmit(payload)
      this.routerDispatch(loginType)
    }
  }

  render() {
    const {username, password, keepAccount, validateText} = this.state
    return (
      <form onSubmit={this.onSubmit} className="form">
        <div key={0} className="form-validate-block">
          <span className="validate-text validate-warning">{validateText}</span>
        </div>
        <div key={1}><Field type={"text"} label={"用户名"} name={"username"} value={username} onChange={this.onChange}/></div>
        <div key={2}><Field type={"password"} label={"密码"} name={"password"} value={password} onChange={this.onChange}/></div>
        <div key={3} className="form-checkbox-block">
          <span className="left-checkbox"><Field type={"checkbox"} label={"自动登录"} name={"keepAccount"} value={keepAccount} onChange={this.onChange} defaultValue={true} /></span>
          <span className="right-link"><a href="#">忘记密码？</a></span>
        </div>
        <div key={4} className="form-submit-block">
          <button type="submit" className="button button-block button-primary clickable">登录</button>
        </div>
      </form>
    )
  }
}

export default withRouter(Form)
