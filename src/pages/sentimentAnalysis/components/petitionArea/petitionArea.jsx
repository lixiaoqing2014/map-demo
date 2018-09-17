import React, {Component} from "react"
import echarts from "echarts"
import MyFetch from "components/global/myFetch"
import {sentimentApi} from "components/global/apiGroup";
import CommonFunc from "components/global/commonFunc";
import LegendList from "../legendList/legendList"
import "./petitionArea.scss"

const DEFAULT_COLORS = ["#2CD3BE", "#158EFE", "#EADA7A", "#9A63E7", "#415BFD", "#42FFFF", "#27395D", "#28B0FA"];

export default class PetitionArea extends Component {

  state = {
    data: []
  }

  componentDidMount () {
    this.getData()
    this.drawChart()
    window.addEventListener("resize", this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.handleResize)
  }

  getData = () => {
    MyFetch.post(sentimentApi.county)
      .then((data) => {
        this.setState({
          data: this.formatData(data.rows)
        }, this.drawChart);
      })
      .catch((err) => {
        console.log(`Fetch error: ${err}`);
      });
  }

  handleResize = () => {
    this.echart && this.echart.resize()
  }

  formatData = (data = []) => (
    data.map((item, index) => (
      {
        value: item.num || 0,
        name: item.countyname || "--",
        itemStyle: {
          color: DEFAULT_COLORS[index] || CommonFunc.getRandomColor()
        }
      }
    ))
  )

  drawChart = () => {
    // use echarts to draw a pie chart
    let dom = document.getElementById("petition-area-chart")
    if (!dom) return
    let myChart = echarts.init(dom);
    
    let option = {
      tooltip : {
        trigger: "item",
        formatter: "{b} : {c}件 ({d}%)",
        backgroundColor: "rgba(12, 47, 107, 0.7490196078431373)"
      },
      series : [
        {
          name: "近30天区县统计",
          type: "pie",
          radius : "60%",
          center: ["25%", "50%"],
          data: this.state.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          label: {
            show: false
          }
        }
      ]
    };

    myChart.setOption(option);
    this.echart = myChart;
  }

  componentWillMount () {
    if (this.echart) {
      this.echart.clear();
      this.echart.dispose();
    }
  }

  render () {
    const {data} = this.state
    return (
      <div className="petition-area-container">
        <div className="title">近30天区县统计</div>
        {data.length > 0
          ? <div className="content">
            <div id="petition-area-chart"></div>
            <div className="petition-area-legend">
              <LegendList 
                listData={data}
                unit="件"
              />
            </div>
          </div>
          : <div className="content">
            <div className="nodata-tip">暂无数据</div>
          </div>
        }
      </div>
    )
  }
}