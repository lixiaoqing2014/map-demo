
import React, {Component} from 'react'
import "./index.scss"
import Mapview from "./components/Mapview/Mapview"
import Sliderbar from "./components/SliderBar/SliderBar"
import Bottombar from "./components/BottomBar/BottomBar"


class Index extends Component {
    render() {
        return (
            <div className="am-container">
                <Mapview />
                <Sliderbar />
                <Bottombar />
            </div>
        )
    }
}

export default Index