import React, {Component} from "react"
class Field extends Component {
  constructor(props){
    super(props);
    this.state={
      hasClass:false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.passWordChange = this.passWordChange.bind(this);
  }
    passWordChange(){
        console.log(this.input.getAttribute("type"));
        if(this.input.getAttribute("type")==="password"){
            this.input.setAttribute("type","text");
            this.setState({
                hasClass:true
            })
        }else{
            this.input.setAttribute("type","password");
            this.setState({
                hasClass:false
            })
        }
    }
  handleInputChange(ev) {
    const {name, onChange} = this.props
    const target = ev.target;
    const value = target.type === "checkbox" ? target.checked : target.value
  }

  _renderInput() {
    const {type,label} = this.props;
    return (<span className="field-container">
      <input className="field-input-type" type="text" onChange={this.handleInputChange} placeholder={label}/>
    </span>)
  }


  _renderInputPassWord(){
      const {type,label} = this.props;
      return (<span className="field-container">
      <input className="field-input-type" type="password" ref={(input)=>this.input=input} onChange={this.handleInputChange} placeholder={label}/>
      <span className={`iconTab iconEyeClose ${this.state.hasClass ? "iconEysOpen":""}`}   onClick={this.passWordChange}></span>
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
        domNode = this._renderInput()
        break
    case "password":
        domNode = this._renderInputPassWord()
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