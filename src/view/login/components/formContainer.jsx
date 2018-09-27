import React, {Component} from "react"
import Form from "./form"
class FormContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="form-container">
          <h2><span>用户登录</span></h2>
          <div className="form-box"><Form /></div>
      </div>
    )
  }
}
export default FormContainer;