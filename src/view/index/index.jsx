import React, {Component} from "react"
import "./index.scss"
import Mapview from "./components/Mapview/Mapview"
import Sliderbar from "./components/SliderBar/SliderBar"
import Bottombar from "./components/BottomBar/BottomBar"


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            hoverInfo:{}
        }
    }

    handleClick(con){
      this.setState({
          info:con
      })
    }
    handleHover(val){
        let data = Object.assign({},this.state.hoverInfo,{Infor:val});
        this.setState({
            hoverInfo:data,
            info:{}
        })

    }
    render() {
        return (
            <div className="am-container">
                <Mapview handleInfo={this.state.info} hoverInfobar={this.state.hoverInfo}/>
                <Sliderbar onInfoClick={this.handleClick.bind(this)}/>
                <Bottombar handleHover={this.handleHover.bind(this)} />
            </div>
        )
    }
}

export default Index