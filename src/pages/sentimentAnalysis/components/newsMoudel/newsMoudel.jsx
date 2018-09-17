import React, { Component } from "react";
import "./newsMoudel.scss";
import HotTopic from "./hotTopic/hotTopic.jsx";
import TrendChart from "../trendChart/trendChart";
import RingPercentChart from "../ringPercentChart/ringPercentChart";
import PetitionScoreRank from "../petitionScoreRank/petitionScoreRank";

import BuzzwordsCharts from "../buzzwordsCharts/buzzwordsCharts";
import "element-theme-default";

export default class newsMoudel extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="news-wrap">
        <section className="news-top">
          <div className="left">
            <HotTopic />
          </div>
          <div className="right">
            <PetitionScoreRank />
          </div>
        </section>
        <section className="news-bottom">
          <div className="left">
            <div className="cpn-title">
              近30天新闻趋势图111111
            </div>
            <div className="news-com">
            	<TrendChart/>
            </div>
          </div>
          <div className="mid">
            <div className="cpn-title">
              近30天新闻分类22222222
            </div>
            <div className="news-com">
              <RingPercentChart rootFontSize={this.props.UIData.rootFontSize} />
            </div>
          </div>
          <div className="right">
            <div className="cpn-title">
              近30天新闻热词33333333
            </div>
            <div className="news-com">
              <BuzzwordsCharts rootFontSize={this.props.UIData.rootFontSize} />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
