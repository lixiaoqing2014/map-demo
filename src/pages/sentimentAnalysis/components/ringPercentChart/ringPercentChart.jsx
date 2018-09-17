import React, {Component} from "react";
import echarts from "echarts";
import MyFetch from "components/global/myFetch";
import {sentimentApi} from "components/global/apiGroup"
import LegendList from "../legendList/legendList"

import "./ringPercentChart.scss"

import { connect } from "react-redux";

const DEFAULT_COLOR = ["#E5D467", "#2CD3BE", "#9A63E7", "#28B0FA", "#42FFFF", "#158EFE"];

class RingPercentChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalNum: 0,
      echartData:[]
    };
  }

  componentDidMount() {
    MyFetch.post(sentimentApi.classifyBillboard)
      .then((data) => {
        this.setState({
          totalNum: data.poTotal,
          echartData:data.rows.map((item, index) => {
            return {
              name: item.classify,
              value: item.poCount,
              itemStyle: {
                color: DEFAULT_COLOR[index] || DEFAULT_COLOR[0]
              }
            }
          })
        })
        this.drawRingPercentChart();
      })
      .catch((err) => {
        console.log(`Fetch error: ${err}`);
        this.setState({
          totalNum: 0,
          echartData:[
            {
              name: "--",
              value:0
            }
          ]
        })
        this.drawRingPercentChart();
      });
  }

  drawRingPercentChart() {
    let myChart = echarts.init(document.getElementById("ring-percent-chart"));

    // let rootfontSize = this.props.UIData.rootFontSize;
    let pieData = this.state.echartData;
    let option = {
      backgroundColor: "#092d5e",
      tooltip: {
        trigger: "item",
        formatter: "{b}<br/>{c} ({d}%)",
        backgroundColor: "rgba(12, 47, 107, 0.7490196078431373)"
      },
      legend: {
        show: false,
        orient: "vertical",
        x: "right",
        y: "middle",
        align: "left",
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 8,
        textStyle: {
          color: "#909295",
          fontSize: 14
        },
        data:this.state.echartData.map((item,index)=>{return item.name}),
        formatter: function (name) {
          return name ;
        }
      },
      series: [{
        name: "",
        type: "pie",
        radius: pieData.length === 1 ? ["43%", "48%"] : ["40%", "51%"],
        center: ["22%", "50%"],
        hoverAnimation: false,
        itemStyle:{
          borderWidth:pieData.length === 1 ? 0 : 2, //设置border的宽度有多大
          borderColor:"#092d5e"
        },
        label: {
          show:false,
        },
        data: this.state.echartData
      }]
    };

    myChart.setOption(option);
    this.echart = myChart;
  }

  resize = () => {
    this.echart && this.echart.resize();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.UIData.rootFontSize !== this.props.UIData.rootFontSize || nextProps.UIData.rootHeight !== this.props.UIData.rootHeight) {
      this.resize();
    }
  }

  componentWillMount () {
    if (this.echart) {
      this.echart.clear();
      this.echart.dispose();
    }
  }

  render() {
    return (
      <div className="ring-percent-chart-container" >
        <div id="ring-percent-chart" className="ring-percent-chart"></div>
        <div className="ring-total-num">
          <p>{ this.state.totalNum }</p>
          <span>件</span>
        </div>
        <LegendList listData={ this.state.echartData } percentage />
      </div>
    )
  }
}

export default connect(state => ({
  UIData: state.UIData
}), {
})(RingPercentChart);
