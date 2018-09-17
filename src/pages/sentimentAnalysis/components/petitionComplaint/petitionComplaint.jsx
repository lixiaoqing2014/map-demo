import React, {Component} from "react"
import Moment from "moment"
import {Select} from "element-react"
import RadioGroup from "components/radioGroup/radioGroup"
import Pagination from "components/paginations/paginations"
import MyFetch from "components/global/myFetch"
import {sentimentApi} from "components/global/apiGroup"
import CONSTS from "./consts"
import "./petitionComplaint.scss"

export default class PetitionComplaint extends Component {

  state = {
    data: {},
    params: {
      queryType: CONSTS.REASON_OPTIONS[0].value,
      optStatus: CONSTS.ALL_STATUS,
      curpage: CONSTS.CURRENT_PAGE,
      pagesize: CONSTS.PAGE_SIZE,
    }
  }

  componentDidMount () {
    this.getData()
  }

  getData = (param) => {
    let params = {...this.state.params, ...param};
    if (this.state.params !== params) this.setState({params});
    let url = "../data/Test.json";
    fetch(url).then((res)=>{
      return res.json();
    }).then((data)=>{
        this.setState({data});
      console.log("测试===",data)
    }).catch((res)=>{
        console.log(res.status);
    })

      MyFetch.post(sentimentApi.tsResult, params)
      .then((data = {}) => {
        console.log("==============",data)
       // this.setState({data});
      })
      .catch((err) => {
        console.log(`Fetch error: ${err}`);
      });
  }

  onCategoryChange = (value) => {
    this.getData({
      queryType: value,
      curpage: CONSTS.CURRENT_PAGE
    })
  }

  onStatusChange = (options) => {
    let option = options.find(option => option.checked)
    this.getData({
      optStatus: option ? option.value : CONSTS.ALL_STATUS,
      curpage: CONSTS.CURRENT_PAGE
    })
  }

  renderComplaintList = () => {
    const getStatusClass = (status) => {
      let statusColor = +status === CONSTS.STATUS_COMPLETED ? "completed" : (+status === CONSTS.STATUS_PENDDING ? "pendding" : null)
      return statusColor ? `content-status ${statusColor}` : "content-status"
    }

    const getStatusLabel = (status) => ((CONSTS.STATUS_OPTIONS.find(opt => opt.value === +status) || {}).label || "--")

    const formatDate = (date) => {
      const md = Moment(date)
      return md.isValid() && md.format("YYYY/MM/DD")
    }

    const { data, params } = this.state;

    return data.rows && data.rows.map((item, index) => (
      <div key={item.content} className="content-container">
        <div className="content-row-one">
          <span className="content-title" title={item.content}><a href={item.url} target="_blank">{`${(params.curpage-1)*params.pagesize + index + 1}. ${item.content}`}</a></span>
          <span className={"content-similar " +  (item.matchCount > 0 ? "" : "content-similar-none-data")} title={item.matchCount + "条相似内容"}>{item.matchCount}条相似内容</span>
        </div>
        <div className="content-row-two">
          <span className="content-reason" title={item.pollutionCategory}>原因：{item.pollutionCategory || "——"}</span>
          <span className="content-assignee" title={item.transactUnit}>办理单位：{item.transactUnit || "——"}</span>
          <span className={getStatusClass(item.status)}>状态：{getStatusLabel(item.status)}</span>
          <span className="content-date">{formatDate(item.ptttime)}</span>
        </div>
      </div>
    ))
  }

  render () {
    return (
      <div className="petition-complaint-container">
        <div className="header">
          <div className="title">近期信访投诉000000</div>
          <Select value={CONSTS.REASON_OPTIONS[0].value} onChange={this.onCategoryChange} className="type-select">
            {
              CONSTS.REASON_OPTIONS.map(option => (
                <Select.Option key={option.value} label={option.label} value={option.value} />
              ))
            }
          </Select>
          <RadioGroup options={CONSTS.STATUS_OPTIONS} className="status-select" onChange={this.onStatusChange} />
        </div>
        {this.state.data.rows && this.state.data.rows.length > 0
          ? <div className="content">
            {this.renderComplaintList()}
          </div>
          : <div className="content nodata">
            <div className="nodata-tip">暂无数据</div>
          </div>
        }
        <Pagination
          className="pagination"
          pagesize={CONSTS.PAGE_SIZE}
          currentpage={this.state.data.curpage || 1}
          total={this.state.data.total}
          changePage={(curpage) => this.getData({curpage: +curpage})}
        />
      </div>
    )
  }
}
