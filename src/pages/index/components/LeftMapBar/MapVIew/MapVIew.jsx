import React, { Component } from "react"
import "./MapVIew.scss"
import { loadModules } from "react-arcgis"
import { connect } from "react-redux"

@connect(
    state => state.map
)

export default class MapVIew extends Component {
    componentDidMount() {
        // var map = new Map(this.props.mapProperties);
        // var view = new SceneView({
        //     container: this.viewDiv,
        //     map: map,
        //     ...this.props.viewProperties
        // });
        // var searchWidget = new Search({
        //     view: view
        // });
        // view.ui.add(searchWidget, {
        //     position: "top-right"
        // });
    }
    mapDom() {
        loadModules(["esri/Map",
            "esri/views/MapView",
            "esri/views/SceneView",
            "esri/widgets/Search"
        ]).then(([Map, MapView, SceneView, Search]) => {

            var switchButton = this.input
            var appConfig = {
                mapView: null,
                sceneView: null,
                activeView: null,
                container: this.viewDiv  // use same container for views
            };

            var initialViewParams = {
                zoom: 12,
                center: [-122.43759993450347, 37.772798684981126],
                container: appConfig.container
            };
            var map = new Map({
                basemap: "streets",
                ground: "world-elevation"
            });
            // create 2D view and and set active
            appConfig.mapView = createView(initialViewParams, "2d");
            appConfig.mapView.map = map;
            appConfig.activeView = appConfig.mapView;

            // create 3D view, won't initialize until container is set
            initialViewParams.container = null;
            initialViewParams.map = map;
            appConfig.sceneView = createView(initialViewParams, "3d");

            // switch the view between 2D and 3D each time the button is clicked
            switchButton.addEventListener("click", function () {
                switchView();
            });

            // Switches the view from 2D to 3D and vice versa
            function switchView() {
                var is3D = appConfig.activeView.type === "3d";

                // remove the reference to the container for the previous view
                appConfig.activeView.container = null;

                if (is3D) {
                    appConfig.mapView.viewpoint = appConfig.activeView.viewpoint.clone();
                    appConfig.mapView.container = appConfig.container;
                    appConfig.activeView = appConfig.mapView;
                    switchButton.value = "3D";
                } else {
                    appConfig.sceneView.viewpoint = appConfig.activeView.viewpoint.clone();
                    appConfig.sceneView.container = appConfig.container;
                    appConfig.activeView = appConfig.sceneView;
                    switchButton.value = "2D";
                }
            }

            // convenience function for creating a 2D or 3D view
            function createView(params, type) {
                var view;
                var is2D = type === "2d";
                if (is2D) {
                    view = new MapView(params);
                } else {
                    view = new SceneView(params);
                }
                search(view)
                return view;
            }
            // search
            function search (view) {
                var searchWidget = new Search({
                    view: view
                });
                view.ui.add(searchWidget, {
                    position: "top-right"
                });
            }
        })
        return (
            <div>
                <div
                    ref={(dom) => { this.viewDiv = dom }}
                    className="viewDiv"
                    style={{ width: "100vw", height: "100vh" }}
                >
                </div>
                <div id="infoDiv">
                    <input className="esri-component esri-widget--button esri-widget esri-interactive"
                        type="button"
                        id="switch-btn"
                        value="3D"
                        ref={(input) => { this.input = input }}
                    />
                </div>
            </div>
        )
    }
    render() {
        console.log(1234, this.props)
        return (
            <div>
                {this.mapDom()}
            </div>
        )
    }
}