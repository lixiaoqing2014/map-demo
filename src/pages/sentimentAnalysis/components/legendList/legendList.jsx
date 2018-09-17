import React, {Component} from "react"
import PropTypes from "prop-types"
import "./legendList.scss"

export default class LegendList extends Component {
  
  state = {
    total: this.props.total || 0
  }

  percent = 0 // init number

  getPercentage = (item) => {
    const {listData} = this.props
    if (listData[0] === item) this.percent = 0
    let total = listData.reduce((sum, data) => (sum += +data.value), 0)
    if (listData[listData.length - 1] === item) {
      return 100 - this.percent + "%"
    } else {
      let rate = Math.round( +item.value / total * 100  )
      this.percent += rate
      return rate + "%"
    }
  }

  renderContent = (item) => {
    const {percentage, listData, unit} = this.props
    if (percentage) {
      // let total = listData.reduce((sum, data) => (sum += +data.value), 0)
      return <td>{ this.getPercentage(item) }</td>
    } else {
      return <td>{ item.value }{ unit }</td>
    }

  }

  render() {
    const {className, listData} = this.props
    const classname = className ? `lenged-list-container ${this.props.className}` : "lenged-list-container"
    return (
      <table className={classname}>
        <tbody>
          {
            listData && listData.map((item, index) => {
              return (
                <tr key={ index }>
                  <td><span className="legend-shape" style={{ backgroundColor: item.itemStyle ? item.itemStyle.color : "" }} /></td>
                  <td className="legend-name">{ item.name }</td>
                  { this.renderContent(item) }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}

LegendList.propTypes = {
  // eg: [{name: 'name', value: 'value', itemStyle: {color: '#ffffff'}}]
  listData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    itemStyle: PropTypes.shape({
      color: PropTypes.string
    })
  })),
  percentage: PropTypes.bool, // 当为true是会通过计算显示百分比
  unit: PropTypes.string, // 当需要显示单位时需要传入单位，不能与total同时使用
  className: PropTypes.string
}

LegendList.defaultProps = {
  listData: []
}
