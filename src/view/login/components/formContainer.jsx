import React, {Component} from "react"
import {connect} from "react-redux"
import Form from "./form"
import {formSubmit} from "store/login/action"


class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {loginType: 0}
    this.onTabClick = this.onTabClick.bind(this)
  }

  onTabClick(type, ev) {
    this.setState({loginType: type}) 
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
        <div>
          <ul className="tab clickable">
            <li className={tabItemClass1} onClick={this.onTabClick.bind(this,0)}><a>大屏展示版</a></li>
            <li className={tabItemClass2} onClick={this.onTabClick.bind(this,1)}><a>PC业务版</a></li>
          </ul>
        </div>
        <div className="form-box"><Form loginType={loginType} keepAccount={true} onSubmit={onFormSubmit} /></div>
      </div>
    )
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  onFormSubmit: payload => {dispatch(formSubmit(payload))}
})

export default connect(null, mapDispatch)(FormContainer)