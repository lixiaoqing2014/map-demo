import React, {Component} from "react"
import { connect } from "react-redux";
import PropTypes from "prop-types"
import {Table} from "element-react"
import "./table.scss"

class TableWithFixHeight extends Component {
  state = {
    maxHeight: this.props.maxHeight ? this.props.maxHeight * this.props.UIData.rootFontSize : null,
    height: this.props.height ? this.props.height * this.props.UIData.rootFontSize : null
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.UIData.rootFontSize !== this.props.UIData.rootFontSize) {
      this.setState({
        maxHeight: nextProps.maxHeight ? nextProps.maxHeight * nextProps.UIData.rootFontSize : null,
        height: nextProps.height ? nextProps.height * nextProps.UIData.rootFontSize : null
      })
    }
  }

  render () {
    return (
      <div className={`table-with-title table-style-base table-without-border ${this.props.className ? this.props.className : ""}`}>
        <div className="title">66...{this.props.title}</div>
        <Table
          {...this.props}
          height={this.state.height}
          maxHeight={this.state.maxHeight}
          border
          emptyText="暂无数据"
        />
      </div>
    )
  }
}

TableWithFixHeight.propTypes = {
  title: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
}

export default connect(state => ({
  UIData: state.UIData
}), {})(TableWithFixHeight)
