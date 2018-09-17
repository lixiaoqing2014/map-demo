import React, {Component} from "react"
import echarts from "echarts"
import MyFetch from "components/global/myFetch"
import {sentimentApi} from "components/global/apiGroup"
import CommonFunc from "components/global/commonFunc";
import LegendList from "../legendList/legendList"
import "./petitionTypes.scss"

const DEFAULT_COLORS = ["#E5D467", "#2CD3BE", "#9A63E7", "#28B0FA", "#42FFFF", "#158EFE"];

export default class PetitionTypes extends Component {

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
    MyFetch.post(sentimentApi.pollutionCategory)
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
        name: item.pollutionCategory || "--",
        itemStyle: {
          color: DEFAULT_COLORS[index] || CommonFunc.getRandomColor()
        }
      }
    ))
  )

  drawChart = () => {
    // use echarts to draw a doughnut chart
    let dom = document.getElementById("petition-types-chart")
    if (!dom) return
    let myChart = echarts.init(dom);
    
    let isOnlyOneRecord = this.state.data.length === 1

    let option = {
      backgroundColor: "#0a2957",
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
        backgroundColor: "rgba(12, 47, 107, 0.7490196078431373)"
      },
      series: [
        {
          name: "近30天信访分类统计",
          type: "pie",
          radius: isOnlyOneRecord ? ["63%", "77%"] : ["62%", "78%"],
          center: ["25%", "50%"],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            show: false,
          },
          itemStyle: {
            borderColor: "#0a2957",
            borderWidth: isOnlyOneRecord ? 0 : 2
          },
          data: this.state.data
        }
      ]
    };

    myChart.setOption(option);
    this.echart = myChart;
  }

  render () {
    const {data} = this.state
    return (
      <div className="petition-types-container">
        <div className="title">近30天信访分类统计</div>
        {data.length > 0
          ? <div className="content">
            <div id="petition-types-chart"></div>
            <div className="petition-types-legend">
              <LegendList 
                listData={data}
                percentage
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
