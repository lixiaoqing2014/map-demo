import React, {Component} from "react"
import "./BottomBar.scss"


const data = [
    {key: "AQI", data: {}},
    {key: "PM2.5", data: {}},
    {key: "PM10", data: {}},
    {key: "SO2", data: {}},
    {key: "NO2", data: {}},
    {key: "CO", data: {}},
    {key: "O3", data: {}},
    {key: "温度", data: {}},
    {key: "湿度", data: {}},
    {key: "风向", data: {}},
    {key: "风力", data: {}},
]
class BottomBar extends Component {
    render() {
        return (
               <ul className="quality">
                   {
                        data.map( item => {
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
        )
    }
}

export default BottomBar