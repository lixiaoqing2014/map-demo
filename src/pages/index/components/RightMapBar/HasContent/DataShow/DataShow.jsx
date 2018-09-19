import React, {Component} from "react";
import MyFetch from "components/global/myFetch";
import {polluteApi} from "components/global/apiGroup";
import "./DataShow.scss"

const initRateData = [
    {title: "废气达标占比", rate: null, name: "cityExhaustNomalRate"},
    {title: "废水达标占比", rate: null, name: "cityEffluenNomalRate"},
    {title: "传输有效率", rate: null, name: "transportValidRate"},
];

export default class DataShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rateData: [],
            isLoading: false,
            params: {dateType: 1, timeType: 1, time: ""}  //测试用
        };
    }

    postDataShow = (param) => {
        MyFetch.post(polluteApi.dataShow, param)
            .then((data) => {
                let condition = false;

                if ((param.dateType === data.dateType && param.timeType === data.timeType)) {
                    condition = (data.timeType === 1) || (param.time === data.time);
                }

                if (condition) {
                    let rateData = initRateData;
                    rateData.forEach((value) => {
                        value.rate = Math.min(data[value.name] * 100, 100).toFixed(1);
                    });
                    this.setState({
                        rateData,
                        isLoading: false
                    })
                } else {
                    this.setState({isLoading: true});
                }
            })
            .catch((err) => {
                this.setState({rateData: []});
                console.log(`Fetch error: ${err}`);
            });
    };

    // componentWillReceiveProps(nextprop) {
    //     if (JSON.stringify(nextprop.data) !== JSON.stringify(this.props.data)
    //         || nextprop.threshData !== this.props.threshData) {
    //         this.postDataShow(nextprop.data);
    //     }
    // }

    componentDidMount() {
        this.postDataShow(this.state.params);
    }

    render() {
        let {rateData, isLoading} = this.state;

        return (
            <div className="dataShow">
                {
                    (rateData.length === 0) ? (
                        <div className="nodata-tip">暂无数据</div>
                    ) : (
                        <div className="el-table-content">
                            {
                                rateData.map((item) => {
                                    return (
                                        <div className="el-table__row" key={item.name}>
                                            <span className="comp">{item.title}</span>
                                            <span className="bar">
                                            <span style={{width: item.rate + "%"}}></span>
                      </span>
                                            <span className="done">{isLoading ? "加载中..." : item.rate + "%"}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        );
    }

}
