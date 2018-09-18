import React, {Component} from "react";
import "./LeftMapBar.scss"
import TopInfoMenu from "./TopInfoMenu/TopInfoMenu";
import MapVIew from "./MapVIew/MapVIew";
import DefaultView from  "./DefaultView/DefaultView";
export default class LeftMapBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeModuleIndex:0
        }
    }
    changeTabClick(value){
        this.setState({
            activeModuleIndex:value
        })
    }
    componentDidMount() {

    }

    componentWillUnmount() {
    }


    componentWillMount () {

    }
    renderComponent(){
        if(this.state.activeModuleIndex === 0){
            return(
                <MapVIew/>
            )
        }else {
            return (
                <DefaultView/>
            )
        }

    }
    render() {
        return(
            <main className="sentimentAnalysis-container">
                <TopInfoMenu activeModuleIndex={this.state.activeModuleIndex}
                             changeTabClick={(setValue)=>this.changeTabClick(setValue)}
                />
                <div className="contant-container">
                    {
                      this.renderComponent()
                    }
                </div>
            </main>
        )

    }
}