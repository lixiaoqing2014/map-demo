/**
 * change by 李秀静
 */
import React, { Component } from "react";
import "./trendChart.scss";
import echarts from "echarts";
import MyFetch from "components/global/myFetch";
import {sentimentApi} from "components/global/apiGroup"

import { connect } from "react-redux";


class TrendChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShownoData: true
    };
  }

  componentDidMount() {
    MyFetch.post(sentimentApi.trendBillboard)
      .then((data) => {
        this.setState({
          isShownoData: false
        })
        this.drawLineChart(data);
      })
      .catch((err) => {
        console.log(`Fetch error: ${err}`);
      });
  }

  drawLineChart(data) {
    let myChart = echarts.init(document.getElementById("enterprise-let-cmp-trade"));
    let rootFontSize = this.props.UIData.rootFontSize;
    let xData = data.map((item,index)=>{
      return item.pubtime.replace(/-/g,"/");
    })
    let yData = data.map((item,index)=>{
      return Math.abs(item.sumScore);
    })
    let option = {
      color: ["#3EFFFF", "#3EFFFF"],
      textStyle: {
        color: "rgb(255, 255, 255)",
        fontSize: 0.16 * rootFontSize,
      },
      tooltip: {
        trigger: "axis",
        formatter:(params)=>{
          let index = params[0].dataIndex;
          return params[0].axisValue
                  + "<br/>共 "+ data[index].poCount +" 条新闻"
                  + "<br/>严重共 " + data[index].seriousCount +" 条"
        },
        backgroundColor: "rgba(12, 47, 107, 0.7490196078431373)"
      },
      grid : {
        top : 35,
        bottom: 30,
        left: 40,
        right: 40
      },
      xAxis: {
        name: "时间",
        nameTextStyle:{
          color: "#909295",
          fontSize:12
        },
        type: "category",
        boundaryGap: false,
        data: xData,
        axisLabel: {
        	fontSize: 0,
          interval: 6,
          //rotate: 45
          formatter: (value)=>{
            return value.slice(5);
          }
        },
        splitLine: {
        	show: false
        },
        nameLocation: "end",
        nameGap:10,
        axisLine: {
          lineStyle: {
            color: "#3485F7",
            width: 2
          }
        },
        axisTick: {
        	show: false
        },
      },
      yAxis: {
        type: "value",
        name: "舆情分",
        nameLocation:"end",
        nameGap:10,
        axisLabel: {
        	fontSize: 0,
          formatter: (value)=>{
            if(value > 0){
              return value
            }
            return ""
          }
        },
        nameTextStyle:{
          color: "#909295",
          fontSize:12,
          padding:[0,35,8,0]
        },
        splitNumber: 6,
        splitLine: {
        	show: true,
          lineStyle: {
            color: "#113F81"
          }
        },
        axisLine: {
        	lineStyle: {
        		color: "#3485F7",
        		width: 2
        	}
        },
        axisTick: {
        	show: false
        }
      },
      series: [
        {
          name: "",
          data: yData,
          type: "line",

          smooth: true,
          showSymbol:false,
          symbolSize: 6,
          symbol:"image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAAGXcA1uAAAAAXNSR0IArs4c6QAAA0VJREFUSA2VVm1ojWEYfp4XK9oQtWbWmo+WCX9oNrVWW35ImY8fhCbZVlpNajT+yB/5WMlKislHI36gKfzQVkuhlUIyX2NlsVYKpyzj7HFd9977Pe97znR27np77uf+/nzOsQZQ7VxjljGdgkxfXuv4eUIhW6HKuZjgZe8/iwgIzpuxuEAFxk9SKZFdWu+Iw3rcUrd3dUN2fOR3IF3+8oqxvFHCGeMpB8R9ipP5Ft/9gLDWuQ20O6emxS080SE+yKQP92TFrkDQWGvKX1xO2A04Dt4AgUNl5G2rZkRxiYrmlMGz2wKUwCDiLNnEEIPwTLIill7XHTc/evtSVMqeXTR22lQKt1vmC7/FzzceMiMfv6QIK4HVIzCJfiKz1yzjkRY0pJ+QzHF//pqnq+qMCeXKKiw4XCuGphgzXxTULMK7gPCgkQAIxBFG4UNrJd6IwjrnCkaNOQ+lCjAo0NZl7dmEul8lElBzCSvMVByh1MDDXd6lcxAeA55DwsDJawbzZVi1Xx8GSTLsD/tEnGWVuCXhlXtIi8Cs0hKztL1FaOy0p0lKdSKi4xc2Uj3BeGNimEKlTNZ71xzk3ZRQSJYK3Ue/fpMbosmflELulkpRQKkfeWwMb+zo/6Do4A5hYd0bPLgo5I3tT1HC9HNSfYg9sHZQOo3smxDfGeUknxAaQ8fRP79xuLThxsGS8MIKoLWrMOniISxAHF3NR+uPAt0Nz2I5WUbvvpNLSO2IDqjyeEYcMBXQTsPopKodNuQb40juZ4bKEweMGLm+AVHmlUyO4sCp62boZndk/1RRThQ9b2uVKTqwXZ6IEC+GtJcwI+uv2EC4FJ+OXTVDN7pC8unR8OJTmqXDWBR5/v4Gdea2ZWqcBqlDXQUGTNtctgol8hy+1RO+ZoQn69I2N0GeJrWUNW+uohmfybq0zWkJOk6Lxa2NKCBYmQJ0RDeq1yaW9BFTHieob2/rhD8qKhM++ciVnGuOTBIMc+Hqg1D5ZGKI76BukR3gYzd8u8d8f/zK6LPEUvB3J3dzpUn+IwCDYzCwSd/swIFGREfYiQ7cg51QXpqTs79TDatsigNl8PR3pAboenyLkF0+6VDiYPTju4dZ7+SrRvpE8A+670xBKTK1wgAAAABJRU5ErkJggg==",
          areaStyle: {
          	color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: "#157F7C" // 0% 处的颜色
              }, {
                offset: 1, color: "#0A2B5D" // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            },
          },
        }
      ],
      animationDelay: 0
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
    if(!this.state.isShownoData){
      return (
        <div className="trend-chart-container" id="enterprise-let-cmp-trade"></div>
      )
    }else{
      return (
        <div className="trend-chart-container petition-score-rank-nodata">
          <div className="nodata-tip">暂无数据</div>
        </div>
      )
    }
  }
}

export default connect(state => ({
  UIData: state.UIData
}), {
})(TrendChart);
