import React, {Component} from "react"
import PropTypes from "prop-types"
import ReactDOM from "react-dom"
import Moment from "moment"
import EventFunc from "components/global/eventFunc"
import BaseDatePicker from "./baseDatePicker"
import _ from "lodash"

const DateTypeFormat = {
  YEAR: "YYYY",
  MONTH: "YYYY-MM",
  DAY: "YYYY-MM-DD",
  HOUR: "YYYY-MM-DD HH:mm",
  MIN: "YYYY-MM-DD HH:mm",
  SEC: "YYYY-MM-DD HH:mm:ss"
}

const dateFormatter = (date, type = "DAY") => {
  if (date === "") return "";
  if (!(date instanceof Moment)) date = Moment()
  let curType = DateTypeFormat[type.toUpperCase()]
  return type.toUpperCase() === "HOUR" ? date.startOf("hour").format(curType) : date.format(curType)
}

export default class DatePicker extends Component {
  constructor (props) {
    super(props)
    this.isShow = false
    this.state = {
      value: ""
    }
  }

  componentDidMount () {
    this.picker = document.createElement("div")
    EventFunc.addEvent(this.picker, "click", this.handleNodeClick)
    EventFunc.addEvent(document, "click", this.handleDocumentClick)
    EventFunc.addEvent(window, "scroll", this.closePicker)
    EventFunc.addEvent(window, "resize", this.closePicker)

    this.valueConverter(this.props)
  }

  componentWillUnmount () {
    EventFunc.removeEvent(this.picker, "click", this.handleNodeClick)
    EventFunc.removeEvent(document, "click", this.handleDocumentClick)
    EventFunc.removeEvent(window, "scroll", this.closePicker)
    EventFunc.removeEvent(window, "resize", this.closePicker)
    this.closePicker();
  }

  handleNodeClick = (event) => {
    this.nodeClicked = true
  }

  handleDocumentClick = (event) => {
    if (this.nodeClicked) {
      this.nodeClicked = false
      return
    }
    if (this.isShow
      && !this.nodeClicked
      && !ReactDOM.findDOMNode(this).contains(event.target)) {
      this.nodeClicked = false
      this.closePicker()
    }
  }

  closePicker = () => {
    this.isShow && this.toggle()
  }

  toggle = () => {
    this.isShow = !this.isShow
    if (this.isShow) {
      document.body.appendChild(this.picker)
      const picker = this.renderPicker()
      ReactDOM.render(picker, this.picker)
    } else {
      ReactDOM.unmountComponentAtNode(this.picker)
      document.body.removeChild(this.picker)
    }
  }

  // 允许传入日期为字符串/数字/Date对象/Moment对象
  // 方法统一转换传入值至Moment对象，并根据props.type转换成不同格式的字符串
  valueConverter = (props) => {
    let date = props.value
    if (!date) return
    if (!(date instanceof Moment)) {
      if (typeof date === "string" && !isNaN(+date)) date = +date
      date = Moment(date)
      if (!date.isValid()) date = Moment()
    }
    if (date instanceof Moment && !date.isValid()) date = Moment()
    this.setState({
      value: dateFormatter(date, props.type)
    })
  }

  onInnerChange = (d) => {
    let date = _.cloneDeep(d)
    if (date[1]) date.splice(1, 1, date[1] - 1)
    if (!date[2]) date.splice(2, 1, 1)
    let selectedDate = Moment(date)
    this.setState({value: dateFormatter(selectedDate, this.props.type)},
      () => {
        this.props.onChange && this.props.onChange(this.state.value)
      })
  }

  onConfirm = () => {
    // this.props.onChange && this.props.onChange(this.state.value)
    this.closePicker()
  }

  onClear = () => {
    this.setState({value: ""}, () => {
      this.props.onChange && this.props.onChange(this.state.value)
    })
  };

  componentWillReceiveProps (nextProps) {
  	if (nextProps.value === "") return;
    let type = this.props.type.toUpperCase();
    let value = Moment(nextProps.value);

	  if (value !== this.state.value) {
	    this.setState({
        value: dateFormatter(value, type)
      })
    }
  }

	renderPicker = () => {
	  const target = ReactDOM.findDOMNode(this)
	  const rect = target.getBoundingClientRect()
	  this.picker.style = `position: fixed; top:${rect.bottom + 5}px; left:${rect.left}px`
	  return <BaseDatePicker
	    onChange={this.onInnerChange}
	    onConfirm={this.onConfirm}
	    value={this.state.value ? this.state.value.split(/\s|-|:/).map(d => parseInt(d)) : undefined}
	    disableDate={this.props.disableDate}
	    type={this.props.type.toUpperCase()}
	  />
	}

	render () {
	  const {showClose, showIcon, className} = this.props
	  return (
	    <div className={`my-calendar-entry ${showClose ? "has-close" : ""} ${className ? className : ""}`}>
	      <input
	        type="text"
	        onClick={this.toggle}
	        value={this.state.value}
	        readOnly
	        placeholder={this.props.placeholder}
	        className={showIcon ? "date-icon" : ""}
	      />
	      {showClose && <span className="date-clear" onClick={this.onClear} />}
	    </div>
	  )
	}
}

DatePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date), PropTypes.instanceOf(Moment)]), // 传入日期
  onChange: PropTypes.func, // 修改日期
  type: PropTypes.oneOf(["YEAR", "MONTH", "DAY", "HOUR", "MIN", "SEC"]), // 允许展示的时间类型
  disableDate: PropTypes.func, // 禁止日期
  showClose: PropTypes.bool, // 显示清除日期按钮
  showIcon: PropTypes.bool, // 显示日期图标
  placeholder: PropTypes.string,
  className: PropTypes.string,
}

DatePicker.defaultProps = {
  type: "DAY", // 默认时间类型为只显示"YYYY-MM-DD"
  placeholder: ""
}
