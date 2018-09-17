import React, { Component } from "react";
import "./hotTopic.scss";
import MyFetch from "components/global/myFetch";
import {sentimentApi} from "components/global/apiGroup";
import Paginations from "components/paginations/paginations";
import infoDisplayHoc from "components/infoDisplayHoc/infoDisplayHoc";

const HOT_TAB_LIST = [
  { name: "total", title: "综合" },
  { name: "airEnv", title: "大气环境" },
  { name: "waterEnv", title: "水环境" },
  { name: "solidWaste", title: "固废" },
  { name: "earthWaste", title: "土壤" },
  { name: "voice", title: "噪音" },
  { name: "others", title: "其他" },
];
const WICKED_DEGREE = [ "", "low", "mid", "hight" ];
const WICKED_HEADER = [
  { title: "正常", degree: 0 },
  { title: "轻微严重", degree: 1 },
  { title: "一般严重", degree: 2 },
  { title: "非常严重", degree: 3 },
];
const PAGE_SIZE = 7;

class HotTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotSubjects: "total",
      activeTopicRankKey:"total",
      hotSubjectsData: [],
      totalPage: 27,
      pageSize: PAGE_SIZE,
      curpage: 1
    };
  }

	toggleSubjects = (key) => {
	  this.setState({
	    activeTopicRankKey:key,
	    hotSubjects:key
	  });
	  this.getData(1,key);
	}

	getData = (curpage, classify) => {
	  let arr = {
		  total: "1",
		  airEnv: "2",
		  waterEnv: "3",
		  solidWaste: "4",
		  earthWaste: "5",
		  voice: "6",
		  others: "7"
	  }
	  let postData = {
	  	classify: arr[classify] || arr[this.state.activeTopicRankKey],
	  	pageNum: curpage || this.state.curpage,
	  	pageSize: this.state.pageSize
	  };

	  MyFetch.post(sentimentApi.hotTopic, postData)
	    .then((data) => {
	      this.setState({
	      	totalPage: data.total,
	      	curpage: curpage,
	        hotSubjectsData: data.rows
	      });
	    })
	    .catch((err) => {
	      console.log(`Fetch error: ${err}`);
	    });
	}

	componentWillMount() {
	  this.getData(1, "total");
	}

	componentWillUnmount() {
	}

	render()
	{
	  const { activeTopicRankKey, curpage, totalPage } = this.state;
	  let degreeList = (item, isShowTitle = true) => {
	    let res = [];
	    let degree = Math.abs(item.degree);
	    if (degree === 0) {
	      res.push(<span className={"squ"} key={0}>-</span>)
	    } else {
	      for (let i = 1; i <= degree; i++) {
	        res.push(<span className={"squ " + WICKED_DEGREE[i]} key={i}></span>)
	      }
	    }
	    isShowTitle && res.push(<span className="level" key={degree + 1}>{item.title}</span>);
	    return res;
	  };

	  return (
	    <div className="hot-topic">
	      <div className="clarify-control">
	        <div className="h-title">
	          {
	            HOT_TAB_LIST.map(item => {
	              return (
	                <div key={item.name} onClick={()=>{this.toggleSubjects(item.name)}}
	                  className={"tab-label " + (activeTopicRankKey === item.name ? " active-item" : "")}>
	                  {item.title}
	                </div>
	              )
	            })
	          }
	        </div>
	        <Paginations
	          pagesize={PAGE_SIZE}
	          small={true}
	          currentpage={curpage}
	          total={totalPage}
	          className="page"
	          changePage={this.getData.bind(this)}/>
	      </div>
	      <div className="subjects-rank">
	        <div className="table-header">
	          <div className="rank">排名</div>
	          <div className="title">标题</div>
	          <div className="focuscnt focuscnt-header">严重程度
	            <div className="fuco-contain icon">!
	              <div className="focu-box">
	                {
	                  WICKED_HEADER.map( item => {
	                    return (
	                      <div className="line" key={item.title}>
	                        {degreeList(item)}
	                      </div>
	                    )
	                  })
	                }
	              </div>
	            </div>
	          </div>
	          <div className="date">日期</div>
	        </div>
	        {
	          this.state.hotSubjectsData.length > 0 ?
	            <div>
	              {
	                this.state.hotSubjectsData.map((item, order) => {
	                  return (
	                    <div className="table-row" key={order}>
	                      <div className="rank">{(curpage-1)*PAGE_SIZE + item.order}</div>
	                      <div className="title" title={item.title}>
	                        <a href={item.url} target="_blank">{item.title}</a>
	                      </div>
	                      <div className="focuscnt line">
	                        {degreeList(item, false)}
	                      </div>
	                      <div className="date">
	                        {(item.date).replace(/-/g, "/")}
	                      </div>
	                    </div>
	                  )
	                })
	              }
	            </div> : <div className="petition-score-rank petition-score-rank-nodata">
	              <div className="nodata-tip">暂无数据</div>
	            </div>
	        }
	      </div>
	    </div>
	  );
	}
}

export default infoDisplayHoc("近30天热门话题榜", { height: "3.7rem" }, { marginBottom: "0.25rem" })(HotTopic);
