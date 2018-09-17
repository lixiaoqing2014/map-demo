/**
 * creat by 李秀静
 */
import React, { Component } from "react";
import "./petitionScoreRank.scss";
import MyFetch from "components/global/myFetch";
import {sentimentApi} from "components/global/apiGroup"
import infoDisplayHoc from "components/infoDisplayHoc/infoDisplayHoc";

class PetitionScoreRank extends Component {

  constructor(props) {
    super(props);
    this.most = 0;
    this.state = {
      sentimentRankData: [],
    };
  }

  componentDidMount() {
    MyFetch.post(sentimentApi.countyBillboard)
      .then((data) => {
        let rankData = data;
        let most = 0;
        rankData.forEach((item,index)=>{
          most = most > item.poCount ? most : item.poCount
        })
        this.most = most * 1.2;
        this.setState({
          sentimentRankData: rankData || [],
        });
      })
      .catch((err) => {
        console.log(`Fetch error: ${err}`);
      });
  }

  render() {
    if(this.state.sentimentRankData.length > 0){
      return (
        <div className="petition-score-rank">
          <div className="top-three">
            {
              this.state.sentimentRankData
							&& this.state.sentimentRankData.map((item, index) => {
							  if(index < 3){
							    return (
							      <div className={`top-three-block block${index}`} key={index}>
							        <div className="top-three-left">
							          <span className={`rank  rank${index}`}>{index + 1}</span>
							        </div>
							        <div className="top-three-right">
							          <p className={`county county${index}`}>{item.county}</p>
							          <p className="num">{item.poCount}条</p>
							        </div>
							      </div>
							    )
							  }
							})
            }
          </div>
          <table className="table-wrap">
            <tbody>
              {
                this.state.sentimentRankData
							&& this.state.sentimentRankData.map((item, index) => {
							  if(index > 2){
							    return (
							      <tr className="table-row" key={index}>
							        <td className={`rank  rank${index}`}>{index + 1}</td>
							        <td className={`county county${index}`}>{item.county}</td>
							        <td className="bar">
							          <span style={{ width:(item.poCount / this.most * 100) + "%" }}></span>
							        </td>
							        <td className="cnt">{item.poCount}条</td>
							      </tr>
							    )
							  }
							})
              }
            </tbody>
          </table>
        </div>
      )
    }else{
      return (
        <div className="petition-score-rank petition-score-rank-nodata">
          <div className="nodata-tip">暂无数据</div>
        </div>
      )
    }
  }
}

export default infoDisplayHoc("近30天区县新闻榜", { height: "3.7rem" }, { marginBottom: "0.25rem" })(PetitionScoreRank);
