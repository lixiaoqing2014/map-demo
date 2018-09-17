import React, {Component} from "react"
import {DateRangePicker, TimeSelect} from "element-react"
import "./calendar.scss"
import Moment from "moment"
import _ from "lodash"

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {value: props.value}
  }

  componentDidMount() {
    this.truncateDate(this.props.value)

    // 监听时间窗口打开
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    let target = document.body;
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (_.get(mutation, "addedNodes.0.firstChild.className") === "el-time-panel") {
          let targets = document.getElementsByClassName("el-time-panel") || []
          targets = Array.prototype.slice.call(targets)
          targets.forEach(target => {target.className += " custom-time-only"})
        }
      });
    });
    this.observer.observe(target, {childList: true, subtree: false});
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(nextProps.value, this.props.value)) {
      this.truncateDate(nextProps.value)
    }
  }

  componentWillUnmount () {
    this.observer.disconnect()
  }

  truncateDate = (value) => {
    if (Array.isArray(value)) {
      this.setState({value: value.map(date => (date instanceof Date) ? new Date(Moment(date).startOf("hour")) : date)})
    }
  }

  onChange = (value) => {
    this.setState({value})
    this.props.onChange && this.props.onChange(value)
  }

  render () {
    return (
      <div className={`date-range-picker-container ${this.props.className ? this.props.className : ""}`}>
        <DateRangePicker
          placeholder="选择日期范围"
          isShowTime={true}
          {...this.props}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
