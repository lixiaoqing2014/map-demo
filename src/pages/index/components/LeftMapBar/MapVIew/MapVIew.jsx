import React, {Component} from "react";
import "./MapVIew.scss";
import { Scene } from "react-arcgis";
import { connect } from "react-redux"

class MapVIew extends Component {
    render () {
        console.log("===>>>>>>", this)
        return (
            <div className="mapDiv">
                <Scene
                    style={{ width: "100vw", height: "100vh" }}
                    mapProperties={this.props.mapProperties}
                    viewProperties={this.props.viewProperties} 
                />
            </div>
        )
    }
}

export default connect(state => state.map, {})(MapVIew);