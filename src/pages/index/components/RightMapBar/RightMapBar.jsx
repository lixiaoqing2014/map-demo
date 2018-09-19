import React, {Component} from "react";
import "./RightMapBar.scss";
import TopInfoMenu from "./TopInfoMenu/TopInfoMenu";
import HasContent from "./HasContent/HasContent";
import Default from "./Default/Default"

export default class RightMapBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeModuleIndex: 0
        }
    }
    componentChange(){
        if(this.state.activeModuleIndex == 0){
            return <HasContent />
        }else{
            return <Default />
        }
    }
    changeTabClick(value) {
        this.setState({
            activeModuleIndex:value
        })

    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }


    componentWillMount() {

    }

    render() {
        return (
            <div>
                <TopInfoMenu activeModuleIndex={this.state.activeModuleIndex}
                              changeTabClick={value => this.changeTabClick(value)}/>

                <div className="ListContainer">
                    {
                      this.componentChange()
                    }
                </div>
            </div>


        )

    }
}