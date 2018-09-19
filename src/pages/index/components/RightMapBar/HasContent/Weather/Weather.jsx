import React, { Component } from "react";
import "./Weather.scss";
import { envApi } from "components/global/apiGroup";
import MyFetch from "components/global/myFetch";
import {
    POLLUTE_NAME_TABLE,
    POLLUTE_WEATHER_ICON
} from "components/global/globalConst";

const LEVEL = ["优", "良", "轻度污染", "中度污染", "重度污染", "严重污染"];
const COLOR = [
    "#83D77C",
    "#EFCA2A",
    "#F4980E",
    "#CC2229",
    "#8254AB",
    "#6F4B2F"
];

const SERVE = [
    ["空气质量让人满意，基本无空气污染", "各类人群可正常活动"],
    [
        "空气质量可接受，但某些污染物可能对极少异常敏感人群健康有较弱影响",
        "极少数异常敏感人群应减少户外运动"
    ],
    [
        "易感人群症状有轻度加剧，健康人群出现刺激症状",
        "儿童,老年人及心脏病，呼吸系统疾病患者应减少时间，高强度的户外锻炼"
    ],
    [
        "进一步加剧易感人群症状,可能对健康人群心脏，呼吸系统有影响",
        "儿童,老年人及心脏病，呼吸系统疾病患者避免长时间，高强度的户外锻炼，一般人群适量减少户外运动"
    ],
    [
        "心脏病和肺病患者症状显著加剧，运动耐受力降低，一般人群普遍出现症状",
        "儿童,老年人及心脏病，呼吸系统疾病患者应停留在室内，停止户外运动，一般人群减少户外运动"
    ],
    [
        "健康人情运动耐受力降低，有明显强烈症状，提前出现某些疾病",
        "儿童,老年人及病人应停留在室内，避免体力消耗，一般避免户外活动"
    ]
];
export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toptitletime: "2018-3-19 10:00发布",
            data: [],
            weatherdata: []
        };
    }

    componentDidMount() {
        this.getRealtime(); // 获取实时空气质量状况
        this.getTwodayqua(); // 获取未来2日空气质量预报 (未来两日包含当日的天气情况)
    }

    getRealtime = () => {
        var mydate = new Date();
        let hour = parseInt(mydate.getHours());
        MyFetch.post(envApi.todayAirQualiy, { hour: hour })
            .then(data => {
                this.setState({
                    data: data
                });
            })
            .catch(err => {
                console.log(`Fetch error: ${err}`);
            });
    };
    getTwodayqua = () => {
        var mydate = new Date();
        let hour = parseInt(mydate.getHours());
        MyFetch.post(envApi.twodayKnow, { hour: hour })
            .then(data => {
                if (data !== null) {
                    this.setState({
                        weatherdata: data
                    });
                }
            })
            .catch(err => {
                console.log(`Fetch error: ${err}`);
            });
    };
    render() {
        let obj = [];
        let aqicolor = {};
        //  如果实时空气质量状况不为空，且存在 则拼接数据

        if (this.state.data !== null && JSON.stringify(this.state.data) !== "{}") {
            let listdata = this.state.data;
            obj = [
                {
                    list: [
                        {
                            name: POLLUTE_NAME_TABLE["PM2.5"],
                            value: listdata.pm25 || "--",
                            level: listdata.pm25Level
                        },
                        {
                            name: POLLUTE_NAME_TABLE["PM10"],
                            value: listdata.pm10 || "--",
                            level: listdata.pm10Level
                        }
                    ]
                },
                {
                    list: [
                        {
                            name: POLLUTE_NAME_TABLE["NO2"],
                            value: listdata.no2 || "--",
                            level: listdata.no2Level
                        },
                        {
                            name: "CO",
                            value: listdata.co || "--",
                            level: listdata.coLevel
                        }
                    ]
                },
                {
                    list: [
                        {
                            name: POLLUTE_NAME_TABLE["SO2"],
                            value: listdata.so2 || "--",
                            level: listdata.so2Level
                        },
                        {
                            name: POLLUTE_NAME_TABLE["O3"],
                            value: listdata.o3 || "--",
                            level: listdata.o3Level
                        }
                    ]
                }
            ];
            let serve = SERVE[parseInt(this.state.data.aqiLevel) - 1];

            aqicolor = {
                color: COLOR[parseInt(this.state.data.aqiLevel) - 1]
            };

        }

        return (
            <div className="env-left-pageone-container">
                <div className="top-box">

                    {(this.state.data === null || this.state.data.length === 0 || JSON.stringify(this.state.data) === "{}")
                    && (this.state.weatherdata === null || this.state.weatherdata.length === 0 || JSON.stringify(this.weatherdata.data) === "{}") ? (
                        <div className="quality-box">
                            <div className="nodata-box">
                                <div className="noadata">暂无数据</div>
                            </div>
                        </div>
                    ) : (
                        <div className="quality-box">
                            {JSON.stringify(this.state.weatherdata[1]) !== "{}" ? (
                                <div className="weather-container">
                                    <div className="bottoms-box">
                                        <div className="weather-box">
                                            <img
                                                className="weather-img"
                                                src={
                                                    POLLUTE_WEATHER_ICON[
                                                        this.state.weatherdata[0].weatherType
                                                        ]
                                                }
                                                alt=""
                                            />
                                            <div>{this.state.weatherdata[0].weatherDesc}</div>
                                        </div>
                                        <div className="temp-box">
                                            <div className="temp-number">
                                                温度:{this.state.weatherdata[0].temperature}
                                            </div>
                                            <div className="text-box">
                                                <div className="temp-text ">
                                                    湿度:{this.state.weatherdata[0].humidity}
                                                </div>
                                                &nbsp;&nbsp;
                                                <div className="temp-text ">
                                                   风级:{this.state.weatherdata[0].windDirection}
                                                    {this.state.weatherdata[0].windStrength}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            ) : (
                                <div />
                            )}

                            {JSON.stringify(this.state.data) !== "{}" &&
                            this.state.data !== null &&
                            this.state.data.length !== 0 ? (
                                <div className="tops-box">
                                    <div className="top-left-box">
                                        <div className="top-left-num">
                                            <div className="left-num" style={aqicolor}>
                                                {this.state.data.aqi}
                                            </div>
                                            <div className="left-text">
                                                <div className="left-text-num" style={aqicolor}>
                                                    {LEVEL[parseInt(this.state.data.aqg) - 1]}
                                                </div>
                                                <div className="left-text-text">AQI</div>
                                            </div>
                                        </div>
                                        {this.state.data.aqi <= 50 ? (
                                            <div />
                                        ) : (
                                            <div className="top-left-tips">
                                                <div className="left-tips-title">首要污染物:&nbsp;</div>
                                                <div className="left-tips-value">
                                                    {POLLUTE_NAME_TABLE[this.state.data.pollutant] || this.state.data.pollutant}
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                    <div className="top-right-box">
                                        {obj.map((item, index) => {
                                            let data = item.list;
                                            let stylearray = [
                                                {
                                                    background: COLOR[data[0].level - 1]
                                                },
                                                {
                                                    background: COLOR[data[1].level - 1]
                                                }
                                            ];
                                            return (
                                                <div key={index} className="right-list">
                                                    <div className="list-line">
                                                        <div className="list-item">
                                                            <div className="item-name" style={stylearray[0]}>
                                                                {data[0].name}
                                                            </div>
                                                            <div className="item-value">{data[0].value}</div>
                                                        </div>
                                                        <div className="list-item">
                                                            <div className="item-name" style={stylearray[1]}>
                                                                {data[1].name}
                                                            </div>
                                                            <div className="item-value">{data[1].value}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="nodata-box">
                                    <div className="noadata">暂无数据</div>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>
        );
    }
}
