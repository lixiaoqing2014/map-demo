import React, {Component} from "react"
import echarts from "echarts"
import MyFetch from "components/global/myFetch"
import {sentimentApi} from "components/global/apiGroup"
import "./PetitionHandling.scss"

export default class PetitionHandling extends Component {

    state = {
        data: {}
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
        MyFetch.post(sentimentApi.handling)
            .then((data = {}) => {
                // console.log(data)
                this.setState({data}, this.drawChart);
            })
            .catch((err) => {
                console.log(`Fetch error: ${err}`);
            });
    }

    handleResize = () => {
        this.echart && this.echart.resize()
    }

    drawChart = () => {
        const {complainSum = 1, transactSum = 0} = this.state.data
        const percentageOfDone = (transactSum / complainSum * 100).toFixed(0)
        const percentageOfPending = 100 - percentageOfDone
        // use echarts to draw a doughnut chart
        let dom = document.getElementById("petition-handling-chart")
        if (!dom) return
        let myChart = echarts.init(dom);

        let option = {
            series: [
                {
                    name: "受理率",
                    type: "pie",
                    radius: ["68%", "80%"],
                    center: ["25%", "50%"],
                    color: ["#00a3ff", "#999999"],
                    hoverAnimation: false,
                    label: {
                        normal: {
                            show: false,
                            position: "center",
                            textStyle: {
                                fontSize: "14"
                            }
                        }
                    },
                    data:[
                        {value: percentageOfDone, name: `${percentageOfDone}%\n受理率`},
                        {value: percentageOfPending, name:""}
                    ]
                }
            ]
        };

        myChart.setOption(option);
        this.echart = myChart;
    };

    renderArrow = (diret) => {
       return <span className={`arrow-${diret ? "up" : (diret === -1 ? "down" : "")}`} />
    };

    componentWillMount () {
        if (this.echart) {
            this.echart.clear();
            this.echart.dispose();
        }
    }

    render () {
        const {complainSum, transactSum, similarCompare, annularCompare, similarTrend, annularTrend} = this.state.data
        const percentageOfDone = ((transactSum || 0) / (complainSum || 1) * 100).toFixed(1);
        return (
            <div className="petition-handling-container">
                {complainSum
                    ? <div className="content">
                        <div id="petition-handling-chart"></div>
                        <div className="percentage">
                            <p>{percentageOfDone}%</p>
                        </div>
                        <p>综合指数</p>

                    </div>
                    : <div className="content">
                        <div className="nodata-tip">暂无数据</div>
                    </div>
                }
            </div>
        )
    }
}
