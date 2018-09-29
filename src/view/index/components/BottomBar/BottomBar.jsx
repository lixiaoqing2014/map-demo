import React, {Component} from "react"
import "./BottomBar.scss"

const color = [
    {key: "#7AB3E6"},
    {key: "#36DB7D"},
    {key: "#EFD33B"},
    {key: "#EB8521"},
    {key: "#EF3A3A"},
    {key: "#7E0023"}
]
const data = [
    {key: "AQI", data: {}},
    {key: "PM2.5", data: {}},
    {key: "PM10", data: {}},
    {key: "SO2", data: {}},
    {key: "NO2", data: {}},
    {key: "CO", data: {}},
    {key: "O3", data: {}},
    {key: "综合", data: {}},
    {key: "温度", data: {}},
    {key: "湿度", data: {}},
    {key: "风向", data: {}},
    {key: "风力", data: {}},
]

class BottomBar extends Component {
    render() {
        return (
            <div>
                <div className="color-rank">
                    {
                        color.map((item, i) => {
                            return (
                                <div key={i} className="color-rank-son" style={{background: item.key}} >
                                    <div className="color-rank-bg"></div>
                                    <div className="color-rank-num">0</div>
                                </div>
                            )
                        })
                    }
                </div>
                <ul className="quality">
                    {
                        data.map(item => {
                            return (
                                <li
                                    className="quality-item"
                                    key={item.key}
                                >
                                    <div className="item-scale">
                                        {item.key}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>

            </div>

        )
    }
}

export default BottomBar