import React, { Component } from "react";
import "./selectGroup.scss";
import MyFetch from "components/global/myFetch";
/* <SelectGroup isMust="是否必填（必填为1）" width="组件宽度（带单位）" height="组件高度（带单位）" fetchUrl={请求得API} 
callBackFun={下拉选中回调方法} reqData="请求入参" returnKey="请求返回参数key"
 optionsList="自定义得下拉列表值List<object<"code":code,"name":name>>（api请求优先）" />*/
class SelectGroup extends Component {
  constructor(props) {
    super(props);
    const currDate = new Date();
    const randomNum = Math.random(10)*1000%1;
    console.log(props.optionsList);
    const selectLiId = "selectLiId" + currDate.getTime() + randomNum;
    const containId = "containId" + currDate.getTime() + randomNum;
    this.state = {
      textValue: "",
      textKey: "",
      selectLiId,
      containId,
      optionsList:props.optionsList?props.optionsList:[{name:"暂无数据",code:""}],
    }
  }
  componentDidMount(){
    document.getElementById(this.state.containId).style.width = this.props.width&&this.props.width!==""?this.props.width:"1.6rem";
    document.getElementById(this.state.containId).style.lineHeight = this.props.height&&this.props.height!==""?this.props.height:"0.4rem";
    if(this.props.fetchUrl&&this.props.fetchUrl!==""){
      MyFetch.post(this.props.fetchUrl,this.props.reqData!==""?this.props.reqData:null).then((data)=>{
        let arr = data[this.props.returnKey];//new Array();
        // data[this.props.returnKey].map((item,index)=>{
        //   let obj = {};
        //   obj.value = item.code;
        //   obj.label = item.name;
        //   arr.push(obj);
        // });
        this.setState({
          optionsList:arr,
        });
        if(this.props.isMust && this.props.isMust ==="1"){
          this.setState({
            textValue:arr[0].name,
            textKey:arr[0].code,
          },()=>{this.textOnChange();});
        }
      }).catch((error)=>{
        console.log(`Fetch error: ${error}`);
      });
    }else if(this.props.isMust && this.props.isMust === "1"){
      this.setState({
        textValue:this.state.optionsList[0].name,
        textKey:this.state.optionsList[0].code,
      },()=>{this.textOnChange();});
      //setstate 存在异步 即使触发onchange，此时的数据仍然是原有state数据
    }
  }
  showSelectItem = ()=>{
    let mouseNode = document.getElementById(this.state.selectLiId);
    mouseNode.style.display = "block";
    document.getElementById(this.state.containId).onmouseout = ()=>{
      mouseNode.style.display = "none";
    }
  }
  chooseSelectItem = (item)=>{
    console.log(item);
    const optionsList = this.state.optionsList;
    for (const key in optionsList) {
      if (key === (""+item)) {
        this.setState({
          textKey:optionsList[key].code,
          textValue:optionsList[key].name,
        },()=>{this.textOnChange();});
        let chooseNode = document.getElementById(this.state.selectLiId);
        chooseNode.style.display = "none";
        break;
      }
    }
  }
  textOnChange = ()=>{
    if(Object.prototype.toString.call(this.props.callBackFun) === "[object Function]"){
      this.props.callBackFun(this.state.textKey,this.state.textValue);
    }
  }
  render() {
    const optionsList = this.state.optionsList;
    return(
      <div className="select-contain" id={this.state.containId} onMouseOver = {this.showSelectItem}>
        <div className = "select-trigle">
          <span className = "trigle-frist-span">
            <input readOnly="readOnly" className="select-input" type="text" placeholder="请选择" value={this.state.textValue}/>
          </span>
          <span className="trigle-last-span">
            <i></i>
          </span>
        </div>
        <div className="select-li" id={this.state.selectLiId}>
          <ul>
            {
              optionsList.map((options,index) => (<li key={options.code} onClick = {()=>this.chooseSelectItem(index)}>{options.name}</li>))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default SelectGroup;
