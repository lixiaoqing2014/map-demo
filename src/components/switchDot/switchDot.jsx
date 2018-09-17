import React, {Component} from "react"
import "./switchDot.scss"

export default class SwitchDot extends Component {
  constructor(props){
    super(props);
    this.state = {
      dots: this.props.dots,
      currentdot: 0,
    }  
  }

  handledot=(val)=>{
    this.setState({
      currentdot: val,
    })
    this.props.onChange(val);//回调函数传递参数给父组件
  }


  render () {
    const DotsElements = []; // 保存点元素
    for(let i = 0;i<this.state.dots;i++){
      DotsElements.push(
        <div key={i} className={this.state.currentdot === i? "dot active" : "dot"} onClick={()=>{this.handledot(i)}}></div>
      )
    }
    
    return (
      <div className="switchdot-container">
        <div className="dot-box">
          {DotsElements}
        </div>
      </div>
    )
  }
}
