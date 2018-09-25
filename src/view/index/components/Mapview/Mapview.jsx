import React, { Component } from "react"
import "./Mapview.scss"
import { loadModules } from "react-arcgis"

export default class MapVIew extends Component {
    componentDidMount() {
    }
    mapDom() {
        loadModules(["esri/Map",
            "esri/views/MapView",
            "esri/views/SceneView",
            "esri/widgets/Search",
            "esri/geometry/Point",
            "esri/symbols/TextSymbol",
            "esri/symbols/PictureMarkerSymbol",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/Graphic",
            "esri/layers/support/LabelClass",
            "esri/layers/GraphicsLayer",
            "esri/Color",
            "esri/symbols/Font",
            "esri/layers/MapImageLayer",
            "esri/tasks/Locator",
            // "esri/InfoTemplate",
            "dojo/domReady!"
        ]).then(([Map, MapView, SceneView, Search, Point, TextSymbol, 
            PictureMarkerSymbol, SimpleMarkerSymbol, Graphic, LabelClass, 
            GraphicsLayer, Color, Font, MapImageLayer, Locator
            ]) => {

// 创建地图  satrt
            let appConfig = {
                mapView: null,
                sceneView: null,
                activeView: null,
                container: this.viewDiv  // use same container for views
            };

            let initialViewParams = {
                zoom: 12,
                center: [113.5, 23.1], 
                container: appConfig.container
            };

            let map = new Map({
                basemap: "streets",
            });

            // create 2D view and and set active
            appConfig.mapView = createView(initialViewParams, "2d");
            appConfig.mapView.map = map;
            appConfig.activeView = appConfig.mapView;

            // create 3D view, won"t initialize until container is set
            initialViewParams.container = null;
            initialViewParams.map = map;
            appConfig.sceneView = createView(initialViewParams, "3d");

            // convenience function for creating a 2D or 3D view
            function createView(params, type) {
                let view;
                let is2D = type === "2d";
                if (is2D) {
                    view = new MapView(params);
                } else {
                    view = new SceneView(params);
                }
                search(view)
                return view;
            }
// 创建地图  end
// 2D/3D 切换 start
            let switchButton = this.input
            // switch the view between 2D and 3D each time the button is clicked
            switchButton.addEventListener("click", function () {
                switchView();
            });
            // Switches the view from 2D to 3D and vice versa
            function switchView() {
                let is3D = appConfig.activeView.type === "3d";
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
 // 2D/3D 切换 end
 // 搜索  start           
            // 搜索
            function search (view) {
                let searchWidget = new Search({
                    view: view
                });
                view.ui.add(searchWidget, {
                    position: "top-right"
                });
            }
 // 搜索  end

                var mapCenter = new Point(103.847, 36.0473, {"wkid":4326});  
                map.centerAndZoom(mapCenter,3);
 

        })
        return (
            <div>
                <div
                    ref={(dom) => { this.viewDiv = dom }}
                    className="viewDiv"
                    style={{ width: "100%", height: "100vh" }}
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
        return (
            <div>
                {this.mapDom()}
            </div>
        )
    }
}
