import React, {Component} from "react"
class Field extends Component {
  constructor(props){
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(ev) {
    const {name, onChange} = this.props
    const target = ev.target
    const value = target.type === "checkbox" ? target.checked : target.value
    onChange(name, value)
  }

  _renderInput() {
    const {type, label, name, value} = this.props
    return (<span className="field-container">
      <label className="field-label">{label}</label>
      <input className="field-input" type={type} name={name} value={value} onChange={this.handleInputChange} />
    </span>)
  }

  _renderCheckbox() {
    const {type, label, name, value} = this.props
    return (<label className="field-checkbox">
      <input type="checkbox" name={name} checked={value} onChange={this.handleInputChange} />
      <span className="checkbox"></span>
      <span className="checkbox-label">{label}</span>
    </label>)
  }

  render() {
    const {type} = this.props
    let domNode
    switch(type) {
    case "text":
    case "password":
      domNode = this._renderInput()
      break
    case "checkbox":
      domNode = this._renderCheckbox()
      break
    default:
      domNode = this._renderInput()
      break
    }
    return domNode
  }

}

export default Field