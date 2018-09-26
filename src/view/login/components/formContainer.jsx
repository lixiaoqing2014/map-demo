import React, {Component} from "react"
import {connect} from "react-redux"
import Form from "./form"
import {formSubmit} from "store/login/action"


class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {loginType: 0}
  }

  render() {
    const {loginType} = this.state
    const {onFormSubmit} = this.props
    let tabItemClass1, tabItemClass2
    tabItemClass1 = tabItemClass2 = "tab-item"
    switch(loginType) {
    case 0:
      tabItemClass1 += " active"
      break
    case 1:
      tabItemClass2 += " active"
      break
    }

    return (
      <div className="form-container">
          <h2><span>用户登录</span></h2>
        <div className="form-box"><Form loginType={loginType} keepAccount={true} onSubmit={onFormSubmit} /></div>
      </div>
    )
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  onFormSubmit: payload => {dispatch(formSubmit(payload))}
})

export default connect(null, mapDispatch)(FormContainer)