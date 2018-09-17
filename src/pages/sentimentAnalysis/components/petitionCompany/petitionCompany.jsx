import React, { Component } from "react";
import MyFetch from "components/global/myFetch";
import CommonFunc from "components/global/commonFunc";
import {sentimentApi} from "components/global/apiGroup";
import "./petitionCompany.scss";

const BASE_RATE = 1.4;

export default class PetitionCompany extends Component {
  constructor (props) {
    super(props);
    this.enterpriseRankCountBase = 1;
    this.state = {
      enterpriseRank: [],
    };
  }

	calTotalBase = (data) => {
  	this.enterpriseRankCountBase = Math.max(CommonFunc.getMaxValue(data, "complainNum") * BASE_RATE, 1);
	};

	postenterpriseRank = () => {
	  let params = {
	    "curpage": 0,
	    "pagesize": 7
	  };
	  MyFetch.post(sentimentApi.ssResult, params)
	    .then((data) => {
	      this.calTotalBase(data.rows);
	      this.setState({
	        enterpriseRank: data.rows
	      })
	    })
	    .catch((err) => {
	      console.log(`Fetch error: ${err}`);
	    });
	};

	componentDidMount () {
	  this.postenterpriseRank();
	}

	render () {
	  return (
	    <div className="petition-company-container">
	      <div className="header">
	        <div className="title">近30天信访涉事公司</div>
	      </div>
	      <div className="list-container">
	        <div className="el-table">
	          <div className="el-table__header">
	            <span className="comp">涉事公司</span>
	            <span className="total">被投诉量(条)</span>
	            <span className="done">处理量(条)</span>
	          </div>
	          <div className="el-table-content">
	            {
	              (this.state.enterpriseRank.length > 0) ? (
	                this.state.enterpriseRank.slice(0, 9).map((item) => {
	                  return (
	                    <div className="el-table__row" key={item.companyname}>
	                      <span className="comp" title={item.companyname}>{item.companyname}</span>
	                      <span className="bar">
								        <span style={{ width:(parseInt(item.complainNum) / this.enterpriseRankCountBase * 100) + "%" }}></span>
	                        {item.complainNum}
								      </span>
	                      <span className="done">{item.dealNum}</span>
	                    </div>
	                  )
	                })
	              ) : (
	              	<div className="nodata-container">
	                  <div className="nodata-tip">暂无数据</div>
	                </div>
	              )
	            }
	          </div>
	        </div>
	      </div>
	    </div>
	  );
	}

}