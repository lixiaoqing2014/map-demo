import React, {Component} from "react"
import Field from "./field"
import {withRouter} from "react-router-dom"
class Form extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }
  login(){
    this.props.history.push("/index")

  }
  render() {
    return (
      <div className="form">
        <div key={0} className="form-validate-block">
          <span className="validate-text validate-warning"></span>
        </div>
        <div key={1}><Field type={"text"} label={"用户名"} name={"username"} onChange={this.onChange}/></div>
        <div key={2}><Field type={"password"} label={"密码"} name={"password"}  onChange={this.onChange}/></div>
        <div key={3} className="form-checkbox-block">
          <span className="left-checkbox"><Field type={"checkbox"} label={"自动登录"} name={"keepAccount"}/></span>
          <span className="right-link"><a href="#">忘记密码？</a></span>
        </div>
        <div key={4} className="form-submit-block">
          <button className="button button-block button-primary clickable" onClick={this.login}>登录</button>
        </div>
      </div>
    )
  }
}
export default withRouter(Form);
