import React, { Component } from "react";
import "./detailList.scss";

import MyFetch from "components/global/myFetch";
import CommonFUnc from "components/global/commonFunc";
import {sentimentApi} from "components/global/apiGroup"

class DetailList extends Component {
  constructor (props) {
    super(props);
    this.componentMouted = true;
    this.timers = {};
    this.title = "今日舆情热点：";
    this.state = {
      newsDetailShow: false,
      newsRoll: true,
      news: [],
    }
  }

  sleep(timeout) {
    return new Promise((resolve, reject) => {
      this.timers[timeout] && clearTimeout(this.timers[timeout]);
      this.timers[timeout] = setTimeout(function() {
        resolve();
      }, timeout);
    });
  }

  async newsRollControl() {
    while(this.componentMouted) {
      this.setState({ newsRoll: false });
      await this.sleep(2500);
      while (this.state.newsDetailShow) {
        await this.sleep(100);
      }
      this.componentMouted && this.setState({ newsRoll: true });
      await this.sleep(500);
      let news = this.state.news.slice(1);
      news.push(this.state.news[0]);
      this.componentMouted && this.setState({news})
    }
  }

	toggleNewsDetail = () => {
	  let newsDetailShow = !this.state.newsDetailShow;
	  this.setState({
	    newsDetailShow
	  })
	};

	postNewsData = () => {
	  MyFetch.post(sentimentApi.hotspot)
	    .then((news) => {
	      this.setState({
	        news: CommonFUnc.uniqeByKeys(news, ["title", "url"])
	      },
	      	() => {this.state.news.length > 0 && this.newsRollControl()}
	      );
	    })
	    .catch((err) => {
	      console.log(`Fetch error: ${err}`);
	    });
	};

	dealBeforeMount = () => {
	  document.onclick = (e) => {
	    let eventClass = e.target.className;
	    if (eventClass !== "el-icon-caret-top" && eventClass !== "detail clickable") {
	      if (this.state.newsDetailShow) {
	        this.setState({
	          newsDetailShow: false
	        })
	      }
	    }
	  }
	};

	componentDidMount() {
	  this.postNewsData();
	  this.dealBeforeMount();
	}

	componentWillUnmount() {
	  this.componentMouted = false;
	}

	render () {
	  return (
	    <div className="info-hot">
	      <span>{this.title}</span>
	      <div className="hot-news">
	        <span className="detail clickable" onClick={this.toggleNewsDetail}>
						更多
	          {
	            this.state.newsDetailShow ? (
	              <i className="el-icon-caret-top"></i>

	            ):(
	              <i className="el-icon-caret-bottom"></i>
	            )
	          }
	        </span>
	        <div className={"wrap " + (this.state.newsRoll ? "roll":"")}>
	          {
	            (this.state.news.length > 0)
							&& this.state.news.map((item) => {
	              return (
	                <span key={item.title}>
	                 <span className="word">{item.title}</span>
	              </span>
	              )
	            })
	          }
	        </div>
	      </div>
	      <div className={"hot-news-table " + (this.state.newsDetailShow ? "":" invisible")} >
	        {
	          (this.state.news.length > 0)
						&& this.state.news.map((item, index) => {
						  // TODO: we shouldn't use index as key, once we can get the real data, fix it
	            return (
	              <div className="row" key={index}>
	                <span className="rank">.</span>
	                <span className="name"><a className="event-link" href={item.url} target="_blank">{item.title}</a></span>
	              </div>
	            )
	          })
	        }
	      </div>
	    </div>
	  );
	}

}

export default DetailList;
