import React, { Component } from "react"
import "./MapVIew.scss"
import { loadModules } from "react-arcgis"
export default class MapVIew extends Component {
    componentDidMount() {
    }
    mapDom() {
        loadModules(["esri/Map",
            "esri/views/MapView",
            "esri/views/SceneView",
            "esri/widgets/Search",
            "esri/layers/ArcGISTiledMapServiceLayer",
            "esri/geometry/Point",
            "esri/layers/GraphicsLayer",
            "esri/graphic",
            "dojo/_base/Color",
            "dojo/domReady!"
        ]).then(([Map, MapView, SceneView, Search,Tiled,Point,GraphicsLayer,Graphic,Color]) => {

            var switchButton = this.input
            var appConfig = {
                mapView: null,
                sceneView: null,
                activeView: null,
                container: this.viewDiv  // use same container for views
            };

            var initialViewParams = {
                zoom: 12,
                center : [ 120.160338, 32.325512 ],
                container: appConfig.container
            };
            var map = new Map({
                basemap: "streets",
                ground: "world-elevation"
            });
            console.log("hello world...")
            var tiled = new Tiled("http://server.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer",{"id":"tiled"});
            map.addLayer(tiled);
            var mapCenter = new Point(103.847, 36.0473, {"wkid":4326});
            map.centerAndZoom(mapCenter,3);

            var gLyr = new GraphicsLayer({"id":"gLyr"});
            map.addLayer(gLyr);
            var gLyrLbl = new GraphicsLayer({"id":"gLyrLbl"});
            map.addLayer(gLyrLbl);


            map.on("load",function(){
                for(var i=0;i<data.length;i++){

                    var pt = new Point(data[i].x,data[i].y,{"wkid":4326});
                    var pms;
                    if (data[i].type=="natureHeritage") {
                        pms = new esri.symbol.PictureMarkerSymbol("images/natureHeritage.png",30,30);
                    }else if (data[i].type=="cultureHeritage") {
                        pms = new esri.symbol.PictureMarkerSymbol("images/cultureHeritage.png",30,30);
                    }else if (data[i].type=="doubleHeritage") {
                        pms = new esri.symbol.PictureMarkerSymbol("images/doubleHeritage.png",30,30);
                    }
                    var gImg = new Graphic(pt,pms,data[i]);

                    gLyr.add(gImg);

                    var gLbl = new esri.Graphic(pt,data[i]);
                    gLyrLbl.add(gLbl);
                }

                gLyr.on("mouse-over",function(e){
                    var attr = e.graphic.attributes;
                    showInfo(attr);
                });
            });

            function showInfo(attr){
                var pt=new Point(attr.x,attr.y,{"wkid":4326});//WGS84的点
                map.infoWindow.setTitle(attr.name);
                map.infoWindow.setContent(attr.desc);
                map.infoWindow.show(pt);
            }

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
