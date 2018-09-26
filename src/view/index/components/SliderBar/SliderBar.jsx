import React, {Component} from "react"
import {Layout, Carousel} from "element-react"
import "element-theme-default";
import echarts from "echarts"
import MyFetch from "../../../../components/global/myFetch"
import {sentimentApi} from "../../../../components/global/apiGroup"
import "./SliderBar.scss"
const navItem = [
    { name:"实时数据", indexTab: 0 },
	{ name:"累计数据", indexTab: 1 }
]
const weather = [
    {key: "温度", value:"21C"},
    {key: "湿度", value:"45C"},
    {key: "风向", value:"西北方向"},
    {key: "风力", value:"西南方向"},
    {key: "首要污染物", value:"PM2.5"},
    {key: "预计空气质量", value:"良"},
]
const weather_date = [
    { key: "PM2.5", value: 53},
    { key: "PM10", value: 58},
    { key: "SO2", value: 16},
    { key: "CO", value: 1.1},
    { key: "NO2", value: 42},
    { key: "O3", value: 72}
]
const city_point = [
    { name: "国控点"},
    { name: "省控点"},
    { name: "关心城市"},
    { name: "倒数前十城市"}
]
const title = ["排名", "监测点", "空气质量等级", "AQI", "首要污染物"]
const city_rank = [
    {NO: 1, city: "通新岭", quality: "重度污染", AQI: 303, program: "PM2.5"},
    {NO: 1, city: "通新岭", quality: "重度污染",AQI: 303, program: "PM2.5"},
    {NO: 1, city: "通新岭", quality: "重度污染",AQI: 303, program: "PM2.5"},
    {NO: 1, city: "通新岭", quality: "重度污染",AQI: 303, program: "PM2.5"},
    {NO: 1, city: "通新岭", quality: "重度污染",AQI: 303, program: "PM2.5"},
    {NO: 1, city: "通新岭", quality: "重度污染",AQI: 303, program: "PM2.5"},
    {NO: 1, city: "通新岭", quality: "重度污染",AQI: 303, program: "PM2.5"},
    {NO: 1, city: "通新岭", quality: "重度污染",AQI: 303, program: "PM2.5"},
    {NO: 1, city: "通新岭", quality: "重度污染",AQI: 303, program: "PM2.5"},
    {NO: 1, city: "通新岭", quality: "重度污染",AQI: 303, program: "PM2.5"}
]

class Sliderbar extends Component {
    constructor (props) {
        super(props)
        this.state ={
            activeTab: 0,
            data: {},
            isDrawer: true
        }
    }
    silderTab (indexTab) {
        this.setState({
            activeTab: indexTab
        })
    }
    toggleWeather(flag) {
        this.setState({
            style: flag? {"left": "0.3rem"} : {"left": "-5.1rem"},
            style1: flag? {"opacity": 0} : {"opacity": 1}
        })
    }
    componentDidMount () {
        this.getData()
        window.addEventListener("resize", this.handleResize)
    }
    componentWillUnmount () {
        window.removeEventListener("resize", this.handleResize)
    }
    getData = () => {
        // MyFetch.post(sentimentApi.handling)
            // .then((data = {}) => {
            //     console.log("===>", data)
            //     this.setState({data}, this.drawChart);
            // })
            // .catch((err) => {
            //     console.log(`Fetch error: ${err}`);
            // });
            let data = {
                complainSum: 63,
                transactSum: 19
            }
            this.setState({data}, () => {
                this.drawChart(this.echarts1, "e1")
                this.drawChart(this.echarts2, "e2")
                this.drawChart(this.echarts3, "e3")
                this.drawChart(this.echarts4, "e4")
                this.drawChart(this.echarts5, "e5")
                this.drawChart(this.echarts6, "e6")
            });
    }
    drawChart(dom, echart) {
        if (!dom) return
        const {complainSum = 1, transactSum = 0} = this.state.data
        const percentageOfDone = (transactSum / complainSum * 100).toFixed(0)
        const percentageOfPending = 100 - percentageOfDone
        let myChart = echarts.init(dom);

        let option = {
            series: [
                {
                    name: "受理率",
                    type: "pie",
                    radius: ["68%", "80%"],
                    // center: ["40%", "52%"],
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
        this[echart] = myChart;
    }
    handleResize = () => {
        // this.echart && this.echart.resize()
        this.e1 && this.e1.resize()
        this.e2 && this.e2.resize()
        this.e3 && this.e3.resize()
        this.e4 && this.e4.resize()
        this.e5 && this.e5.resize()
        this.e6 && this.e6.resize()
    }
    weather () {
        return (
            <div className="weather_date">
                <div className="date_left">
                    <p>深圳野生动物园</p>
                    <img src={require("../../../../image/env/weather/10.png")} />
                    <p>2018-09-01</p>
                </div>
                <div className="date_right">
                    {
                        weather.map(item => {
                            return (
                                <p key={item.key} className="">
                                    <span>{item.key}</span>
                                    <span>{item.value}</span>
                                </p>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    render() {
        const {complainSum, transactSum} = this.state.data
        const percentageOfDone = ((transactSum || 0) / (complainSum || 1) * 100).toFixed(1);
        return (
            <div>
                <div className="sliderbar" style={this.state.style}>
                    <div className="nav" id="page-nav">
                    {
                        navItem.map( (item, index) => {
                            return (
                                <div 
                                    className={item.indexTab === this.state.activeTab?"nav-item active":"nav-item"}
                                    key={index}
                                    onClick={() => this.silderTab(item.indexTab)}
                                >
                                    <span>{item.name}</span>
                                    <div className={item.indexTab === this.state.activeTab? "nav-arrows":""}></div>
                                </div>
                            )
                        })
                    }
                    <img 
                        className="img_out" 
                        src={require("../../../../image/env/weather/in.png")}
                        onClick={() => this.toggleWeather(false)}
                    />
                    </div>
                    <Carousel 
                        trigger="click" 
                        className="carousel"
                        autoplay={false}
                    >
                        <Carousel.Item>
                            {this.weather()}
                            <div>
                                <div className="petition-handling-container">
                                    {complainSum
                                        ? <div className="content">
                                            <div id="echarts-wrap">
                                                <div id="petition-handling-chart" ref={(dom) => {this.echarts1 = dom}}></div>
                                                <div className="percentage">
                                                    {percentageOfDone}%
                                                </div>
                                                <p>小时指数</p>
                                            </div>
                                            <div id="echarts-wrap">
                                                <div id="petition-handling-chart" ref={(dom) => {this.echarts2 = dom}}></div>
                                                <div className="percentage">
                                                    {percentageOfDone}%
                                                </div>
                                                <p>当天指数</p>
                                            </div>
                                            <div id="echarts-wrap">
                                                <div id="petition-handling-chart" ref={(dom) => {this.echarts3 = dom}}></div>
                                                <div className="percentage">
                                                    {percentageOfDone}%
                                                </div>
                                                <p>小时综合指数</p>
                                            </div>
                                        </div>
                                        : <div className="content">
                                            <div className="nodata-tip">暂无数据</div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="weather_data">
                                {
                                    weather_date.map( (item, index) => {
                                        return (
                                            <div className="date_item" key={index}>
                                                <p>{item.key}</p>
                                                <p>{item.value}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <div className="petition-handling-container">
                                    {complainSum
                                        ? <div className="content">
                                            <div id="echarts-wrap">
                                                <div id="petition-handling-chart" ref={(dom) => {this.echarts4 = dom}}></div>
                                                <div className="percentage">
                                                    <p>{percentageOfDone}%</p>
                                                </div>
                                                <p>综合指数</p>
                                            </div>
                                            <div id="echarts-wrap">
                                                <div id="petition-handling-chart" ref={(dom) => {this.echarts5 = dom}}></div>
                                                <div className="percentage">
                                                    <p>{percentageOfDone}%</p>
                                                </div>
                                                <p>综合指数</p>
                                            </div>
                                            <div id="echarts-wrap">
                                                <div id="petition-handling-chart" ref={(dom) => {this.echarts6 = dom}}></div>
                                                <div className="percentage">
                                                    <p>{percentageOfDone}%</p>
                                                </div>
                                                <p>综合指数</p>
                                            </div>
                                        </div>
                                        : <div className="content">
                                            <div className="nodata-tip">暂无数据</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            {this.weather()}
                            <ul className="city_point">
                            {
                                city_point.map ( (item, index) => {
                                    return (
                                        <li key={index}>{item.name}</li>
                                    )
                                })
                            }
                            </ul>
                            <ul className="title title-color">
                                {
                                    title.map( (item, index)=> {
                                        return (
                                            <li key={index}>{item}</li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="scroll">
                                {
                                    city_rank.map( (item, index) => {
                                        return (
                                            <ul className="title" key={index}>
                                                <li>{item.NO}</li>
                                                <li>{item.city}</li>
                                                <li>{item.quality}</li>
                                                <li>{item.AQI}</li>
                                                <li>{item.program}</li>
                                            </ul>
                                        )
                                    })
                                }
                            </div>
                        </Carousel.Item>
                    </Carousel>
                    
                </div>
                <div className="img_in_container"
                     style={this.state.style1}
                     onClick={() => this.toggleWeather(true)}
                >
                    <img 
                        className="img_in"
                        src={require("../../../../image/env/weather/out.png")}
                    />
                </div>
            </div>
        )
    }
}
export default Sliderbar