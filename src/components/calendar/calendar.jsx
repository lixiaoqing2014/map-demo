import React, {Component} from "react"
import {DatePicker} from "element-react"
import "./calendar.scss"

export default class Calendar extends Component {
  render () {
    return (
      <div className={`date-picker-container ${this.props.className ? this.props.className : ""}`}>
        <DatePicker
          isShowTrigger={false}
          placeholder="选择日期"
          {...this.props}
        />
      </div>
    )
  }
}