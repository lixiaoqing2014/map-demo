import React, {Component} from "react"
import "./rangeChoose.scss"

export default class RangeChoose extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: this.props.type? this.props.type:["本月","本季","本年"],
      currentType: this.props.currentType? this.props.currentType:"本月",
      width: this.props.width? this.props.width:"auto",
    }
  }


  handledot=(val)=>{
    this.setState({
      currentType: val,
    });
    if(val !== this.state.currentType) this.props.onChange(val);//回调函数传递参数给父组件
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentType !== this.props.currentType) {
      this.setState({
        currentType: nextProps.currentType
      })
    }
  }

  render () {
    const RangeElements = []; // 保存点元素
    let type = this.state.type;
    for(let key in type){
      RangeElements.push(
        <div key={key} className={this.state.currentType === type[key]? "Choose-item active" : "Choose-item"}
          onClick={()=>{this.handledot(type[key])}}
          style={{width: this.state.width}}>
          {type[key]}
        </div>
      )
    }
    return (
      <div className="rangechoose-container">
        {RangeElements}
      </div>
    )
  }
}
