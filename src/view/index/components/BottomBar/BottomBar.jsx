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
    {key: "AQI",sign:"AQI"},
    {key: "PM2.5",sign:"PM2.5"},
    {key: "PM10",sign:"PM10"},
    {key: "SO2",sign:"SO2"},
    {key: "NO2",sign:"NO2"},
    {key: "CO",sign:"CO"},
    {key: "O3",sign:"O3"},
    {key: "综合",sign:"sum"},
    {key: "温度",sign:"temperature"},
    {key: "湿度",sign:"moisture"},
    {key: "风向",sign:"windDirection"},
    {key: "风力",sign:"Windpower"},
]

class BottomBar extends Component {
    constructor(){
        super();
    }

    onMouseEnter(item){
    if(this.props.handleHover){
        var key = item.key;
        var sign = item.sign;
        this.props.handleHover({key,sign})
    }
    }
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
                        data.map((item,index) => {
                            return (
                                <li
                                    className="quality-item"
                                    key={index} onMouseEnter={this.onMouseEnter.bind(this,item)}
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