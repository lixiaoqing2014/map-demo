import React, {Component} from "react"
import { Pagination } from "element-react"
import CommonFunc from "components/global/commonFunc"
import _ from "lodash"
import "./pageRollContainer.scss"

const PAGE_SIZE = 2;

class PageRollContainer extends Component {
  constructor (props) {
    super(props);
    this.prePage = 0;
    this.gotDataPage = 0;
    this.uniqueId = CommonFunc.getRandomId()
    this.state = {
      showData: []
    }
  }

  componentDidMount () {
    this.setState({showData: this.dataSeparate(this.props)})
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(nextProps.data, this.props.data)) {
      this.setState({showData: this.dataSeparate(nextProps)})
    }
  }

  dataSeparate = (props) => {
    const {fullData, pageSize = PAGE_SIZE, data} = props
    let dataArr = _.cloneDeep(this.state.showData)
    if (fullData) {
      dataArr = []
      for (let i = 0; i < data.length; i += pageSize) {
        data && dataArr.push(data.slice(i, i + pageSize))
      }
    } else {
      data && data.length > 0 && dataArr.push(data)
    }
    return dataArr
  }

  pageChange = (currentPage) => {
    if (this.gotDataPage < currentPage) {
      this.gotDataPage = currentPage;
      this.props.pageChange && this.props.pageChange(currentPage)
    }
    this.ctrlItemRoll(currentPage);
  }

  ctrlItemRoll = (currentPage) => {
    let pageInfoDom = document.getElementById(this.uniqueId)
    pageInfoDom && (pageInfoDom.style.marginLeft = `-${100 * (currentPage - 1)}%`)
    this.prePage = currentPage
  }

  render() {
    const {total, pageSize, children, className} = this.props

    return (
      <div className={`pagination-swipe-container ${className ? className : ""}`}>
        <div className="page-item">
          <Pagination
            small={true}
            layout="prev, next"
            total={total}
            pageSize={pageSize || PAGE_SIZE}
            onCurrentChange={this.pageChange}
          />
        </div>

        <div className="swipe-container">
          {this.state.showData.length > 0
            ? <div className="swipe-detail" id={this.uniqueId}>
              {this.state.showData.map((item, index) => (
                <div className="swipe-group" key={index}>
                  {
                    typeof children === "function"
                      ? children(item)
                      : React.cloneElement(children, {data: item})
                  }
                </div>
              ))
              }
            </div>
            : <div className="no-data">暂无数据</div>
          }
        </div>
      </div>
    )
  }
}

export default PageRollContainer