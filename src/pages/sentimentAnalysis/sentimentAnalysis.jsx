import React, { Component } from "react";
import { connect } from "react-redux";

import "./sentimentAnalysis.scss";
import TopInfoMenu from "./components/topInfoMenu/topInfoMenu";
import NewsMoudel from "./components/newsMoudel/newsMoudel";
import PetitionMoudel from "./components/petitionMoudel/petitionMoudel";
import MyFetch from "components/global/myFetch";
import {sentimentApi} from "components/global/apiGroup"


class SentimentAnalysis extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeModuleIndex: 0,
      overView: {
        "todayNewsNumber": 0,      //今日新闻量
        "todayLVNumber": 0,      //今日信访量
        "todayMaxNewsCountyName": "--",  //今日新闻最多的区县名称
        "todayMaxLVCountyName": "--",    //今日信访最多的区县名称
        "mainProblems": "--" //主要问题类型
      },
    };
  }

	postOverView = () => {
	  MyFetch.post(sentimentApi.overview)
	    .then((overView) => {
	      this.setState({
	        overView,
	      });
	    })
	    .catch((err) => {
	      console.log(`Fetch error: ${err}`);
	    });
	};

	componentWillReceiveProps(nextProps) {

	}

	componentDidMount() {
	  this.postOverView();
	}

	componentWillUnmount() {
	}

	changeTabClick (setValue) {
	  this.setState({activeModuleIndex: setValue});
	}

	render() {
	  return (
	    <main className="sentimentAnalysis-container">
	      <TopInfoMenu activeModuleIndex={this.state.activeModuleIndex}
	        overView={this.state.overView}
	        changeTabClick={(setValue)=>this.changeTabClick(setValue)}
	      />
	      <div className="contant-container">
	        {
	          (this.state.activeModuleIndex === 0) ? (
	            <PetitionMoudel UIData={this.props.UIData} />
	          ) : (
	            <NewsMoudel UIData={this.props.UIData} />
	          )
	        }
	      </div>
	    </main>
	  )
	}
}

export default connect(state => ({
  UIData: state.UIData
}), {
})(SentimentAnalysis);
