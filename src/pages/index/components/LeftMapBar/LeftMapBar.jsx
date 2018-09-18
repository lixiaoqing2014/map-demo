import React, {Component} from "react";
import "./LeftMapBar.scss"
import TopInfoMenu from "./TopInfoMenu/TopInfoMenu";
import MapVIew from "./MapVIew/MapVIew"
export default class LeftMapBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeModuleIndex:0
        }
    }
    changeTabClick(value){
        console.log("测试......",value)

    }
    componentDidMount() {

    }

    componentWillUnmount() {
    }


    componentWillMount () {

    }

    render() {
        return(
            <main className="sentimentAnalysis-container">
                <TopInfoMenu activeModuleIndex={this.state.activeModuleIndex}
                             changeTabClick={(setValue)=>this.changeTabClick(setValue)}
                />

                <div className="contant-container">
                    {

                          <MapVIew />

                    }
                </div>
            </main>
        )

    }
}