import React, {Component} from "react";
import echarts from "echarts";
import MyFetch from "components/global/myFetch";
import {sentimentApi} from "components/global/apiGroup";
import wordCloud from "echarts-wordcloud";
import "./buzzwordsCharts.scss"


export default class BuzzwordsCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShownoData:true
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize)
    MyFetch.post(sentimentApi.popWord)
      .then((data) => {
        this.setState({
          isShownoData: false
        })
        this.drawBuzzwordsCharts(data);
      })
      .catch((err) => {
        console.log(`Fetch error: ${err}`);
      });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }

  drawBuzzwordsCharts(data) {
    let rootFontSize = this.props.rootFontSize;
    let myChart = echarts.init(document.getElementById("buzzwords-chart"));
    let maxRatio = 0,maxPerc = 0;
    let chartData = data.map( item => {
      maxRatio = maxRatio > item.popScore ? maxRatio : item.popScore
      return { name: item.popWord,value: item.popScore}
    })
    let option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}： {c}次",
        backgroundColor: "rgba(12, 47, 107, 0.7490196078431373)"
      },
      series: [{
        type: "wordCloud",
        center: ["50%", "50%"],
        color: ["rgba(255,255,255,1)","rgba(255,255,255,.9)","rgba(255,255,255,.8)","rgba(255,255,255,.7)","rgba(255,255,255,1)","rgba(255,255,255,.9)","rgba(255,255,255,.8)"],
        sizeRange: [0.18*rootFontSize, 0.25*rootFontSize],
        gridSize: 0.35*rootFontSize,
        width: "100%",
        height: "100%",
        rotationRange: [0, 0],
        shape: "circle",
        textStyle: {
          normal: {
            color: function(params) {
              let per = params.data.value / maxRatio;
              let opacity = per > 0.3 ? per : 0.3;
              return "rgba(" + [255,255,255,opacity].join(",") + ")";
              //return "white";
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: "#333"
          }
        },
        data: chartData
      }]
    };
    myChart.setOption(option);
    this.echart = myChart;
  }

  handleResize = () => {
    this.echart && this.echart.resize();
  }

  componentWillMount () {
    if (this.echart) {
      this.echart.clear();
      this.echart.dispose();
    }
  }

  render() {
    if(!this.state.isShownoData){
      return (
        <div className="buzzwords-charts-container" id="buzzwords-chart"></div>
      )
    }else{
      return (
        <div className="buzzwords-charts-container petition-score-rank-nodata">
          <div className="nodata-tip">暂无数据</div>
        </div>
      )
    }
  }
}