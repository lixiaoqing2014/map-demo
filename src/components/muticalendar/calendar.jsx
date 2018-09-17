import React, {Component} from "react"
import {DateRangePicker} from "element-react"
import "./calendar.scss"

export default class Calendar extends Component {
  constructor(props) {
    super(props);
  }


  render () {
    return (
      <div className={`date-range-picker-container ${this.props.className ? this.props.className : ""}`}>
        <DateRangePicker
          placeholder="选择日期范围"
          isShowTime={true}
          {...this.props}
        />
      </div>
    )
  }
}
