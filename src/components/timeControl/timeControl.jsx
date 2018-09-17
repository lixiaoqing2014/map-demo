/**
 * 时间轴组件，create by 李秀静
 */
import React, { Component } from "react";
import "./timeControl.scss";

const TIME_LENGTH = 23;
const INTERVAL = 6;
const HOUR_24 = 24;
const DAYS = ["昨日","今日"];

export default class AbnormalData extends Component{
  constructor (props) {
    super(props);
    this.nowTime = new Date().getHours();
    this.dragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.startPosition = 0;
    this.newPosition = 0;
    this.parentWidth = 0;
    this.buttonName = props.buttonName || "全天"
    this.state = {
      nowTime: this.nowTime,
      currentTime: HOUR_24,
      dateType: this.props.initData.dateType,
      timeType: this.props.initData.timeType,
    };
  }

  dayClick(dateType){
    this.setState({
      dateType,
      nowTime: dateType === 0 ? TIME_LENGTH : this.nowTime,
      currentTime: HOUR_24,
      timeType: 1,
    },this.timeChange);
  }

	alldayClick = ()=>{
	  let state = {
	    nowTime: this.state.nowTime,
	    currentTime: HOUR_24,
	    dateType: this.state.dateType,
	    timeType: 1,
	  }
	  if (this.props.buttonAction) {
	    state = this.props.buttonAction(this.state)
	  }
	  this.setState(state, this.timeChange);
	};

	slideChange (value){
	  this.setState({
	    timeType: 0,
	    currentTime:value
	  });
	}

	scaleClick = (value)=>{
	  if(value > this.state.nowTime || value === this.state.currentTime) return
	  this.setState({
	    timeType: 0,
	    currentTime:value
	  },this.timeChange);
	};

	onButtonDown (event){
	  this.parentWidth = event.currentTarget.parentNode.offsetWidth;
	  this.onDragStart(event);

	  window.addEventListener("mousemove", this.onDragging);
	  window.addEventListener("mouseup", this.onDragEnd);
	  window.addEventListener("contextmenu", this.onDragEnd);
	}

	onDragStart=(event)=> {
	  this.dragging = true;
	  this.startX = event.clientX;
	  this.startY = event.clientY;
	  this.startPosition = parseInt(this.currentPosition(), 10);
	  this.newPosition = parseInt(this.currentPosition(), 10);
	};

	onDragging = (event)=> {
	  if (this.dragging) {
	    let clientX = event.clientX;
	    let clientY = event.clientY;
	    let diff = (clientX - this.startX) / this.parentWidth * 100;
	    this.currentX = clientX;
	    this.currentY = clientY;
	    this.newPosition = this.startPosition + diff;

	    this.setPosition(this.newPosition);
	    this.forceUpdate();
	  }
	}

	onDragEnd = ()=> {
	  if (this.dragging) {
	    /*
			 * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
			 * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
			 */
	    setTimeout(() => {
	      this.dragging = false;
	      this.setPosition(this.newPosition);
	      this.timeChange()
	    }, 0);

	  }
	  window.removeEventListener("mousemove", this.onDragging);
	  window.removeEventListener("mouseup", this.onDragEnd);
	  window.removeEventListener("contextmenu", this.onDragEnd);
	}

	setPosition(newPosition) {
	  if(0 >= newPosition || newPosition >= 100) return
	  const lengthPerStep = 100 / this.state.nowTime;
	  const steps = Math.round(newPosition / lengthPerStep);
	  if(parseInt(steps) !== this.state.currentTime){
	    this.slideChange(parseInt(steps));
	  }
	}

	wrapperStyle() {
	  return { left: this.currentPosition() };
	}

	currentPosition() {
	  return `${ (this.state.currentTime / this.state.nowTime) * 100 }%`;
	}

	creatScale (){
	  let scaleElement = []
	  for(let i=0;i<=TIME_LENGTH;i++){
	    let isInterval = i % INTERVAL === 0 || i === 23;
	    scaleElement.push( <div
	      key={i}
	      className={`scale ${ isInterval ? "scale1" : ""}`}
	      style={{left:(i/(TIME_LENGTH)*100)+"%"}}
	      title={i+"时"}
	      onClick={()=>{this.scaleClick(i)}}>
	      {
	        isInterval ? <span className="number">{i}</span> : ""
	      }
	    </div> )
	  }
	  return scaleElement
	}

	timeChange(){
	  this.props.onTimeChange({
	    dateType: this.state.dateType,
	    timeType: this.state.timeType,
	    time: this.state.currentTime === HOUR_24 ? "" : this.state.currentTime
	  })
	}

	componentWillUnmount () {
	  let monitorTime = {
	    dateType: this.state.dateType,
	    timeType: this.state.timeType,
	    time: this.state.currentTime
	  };
	  if (typeof this.props.sessionName !== "undefined") {
	    sessionStorage.setItem(this.props.sessionName, JSON.stringify(monitorTime))
	  }
	}

	componentDidMount () {
	  if (typeof this.props.sessionName === "undefined") {
	    return;
	  }
	  let monitorTime = sessionStorage.getItem(this.props.sessionName);
	  if (monitorTime) {
	    let timeParams = JSON.parse(monitorTime);
	    this.setState({
	      dateType: timeParams.dateType,
	      timeType: timeParams.timeType,
	      currentTime: timeParams.time,
	      nowTime:timeParams.dateType === 0 ? TIME_LENGTH : this.nowTime,
	    }, ()=>{
	      this.timeChange();
	    })
	  }
	}

	render() {
	  return (
	    <main className="time-control-compnent">
	      <div className="day-switch">
	        {
	          DAYS.map((item,index)=>{
	            return <span
	              key={index}
	              className={`day ${index === this.state.dateType?"active":""}`}
	              onClick={()=>{this.dayClick(index)}}>{item}</span>
	          })
	        }
	      </div>
	      <div className="time-all">
	        <div className="time-slider" style={{ width:(this.state.nowTime/TIME_LENGTH*100)+"%" }}>
	          <div
	            className="slide-button"
	            style={this.wrapperStyle()}
	            onMouseDown={this.onButtonDown.bind(this)}>
	            {this.buttonName}
	            <div className="slide-tooltip center-x">{(this.state.currentTime !== HOUR_24) ? (this.state.currentTime+"时") : this.buttonName}</div>
	          </div>
	        </div>
	        {
	          this.creatScale()
	        }
	      </div>
	      <div className={"allday " + (this.state.timeType ? "allday_active" : "")}  onClick={this.alldayClick}>{this.buttonName}</div>
	    </main>
	  )
	}
}

