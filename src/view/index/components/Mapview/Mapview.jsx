import React, {Component} from "react"
import "./Mapview.scss"
import esriloader from "esri-loader"
import Group10 from "../../../../image/icon/Group10.png"
import Group11 from "../../../../image/icon/Group11.png"
import Group12 from "../../../../image/icon/Group12.png"
import Group13 from "../../../../image/icon/Group13.png"
import Group14 from "../../../../image/icon/Group14.png"

export default class MapVIew extends Component {

    componentDidMount() {
        this.mapDom();
    }
    componentWillReceiveProps(nextProps){
        this.mapDom(nextProps)
    }
    mapDom(nextProps) {
        const mapURL = {
            url : "https://js.arcgis.com/4.9/"
        }
        esriloader.loadModules(["esri/Map",
            "esri/views/MapView",
            "esri/views/SceneView",
            "esri/layers/TileLayer",
            "esri/layers/GraphicsLayer",
            "esri/Graphic",
            "esri/widgets/Search",
            "esri/geometry/Point",
            "esri/geometry/Extent",
            "esri/symbols/PictureMarkerSymbol",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/symbols/TextSymbol",
            "esri/widgets/ScaleBar",
            "dojo/domReady!"
        ],mapURL).then(([Map, MapView, SceneView, TileLayer, GraphicsLayer, Graphic, Search, Point, Extent, PictureMarkerSymbol, SimpleMarkerSymbol, TextSymbol,ScaleBar]) => {

// 创建地图  satrt
            let centerParams = [114.062827, 22.550058];//深圳坐标
           //let centerParams = [116.101208, 39.946778] //北京坐标
            //var startExtent = new Extent({xmin:113.869656,xmax:114.397428,ymin:22.501451,ymax:23.04528});
            let appConfig = {
                mapView: null,
                sceneView: null,
                activeView: null,
                center: centerParams,
                container: this.viewDiv,  // use same container for views extent:startExtent

            };
            let initialViewParams = {
                zoom: 11,
                center: appConfig.center,
                container: appConfig.container,
            };

            // var layer = new TileLayer({
            //     url: "https://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer"
            // });

            let map = new Map({
                basemap: "dark-gray",
                //layers:layer
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
                search(view);
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
            function search(view) {
                let searchWidget = new Search({
                    view: view
                });
                view.ui.add(searchWidget, {
                    position: "top-right"
                });
                //测量标尺
                // var scaleBar = new ScaleBar({
                //     view: view
                // });
                // view.ui.add(scaleBar, {
                //     position: "bottom-right"
                // });
                view.ui.move("zoom", "bottom-right");

            }

            var graphicsLayer = new GraphicsLayer();
            var textLayer = new GraphicsLayer();
            map.addMany([graphicsLayer, textLayer]);
            fetch("./data/data.json").then(function (data) {
                return data.json();
            }).then(function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    var pms;
                    var pmsText;
                    var point;
                    var symbol;
                    var textSymbol;
                    var PointAtt;
                    point = {
                        type: "point",
                        x:data.data[i].x,
                        y:data.data[i].y
                    }
                    PointAtt = {
                        Name: data.data[i].name,
                        Desc: data.data[i].desc
                    }
                    textSymbol = {
                        type: "text",  // autocasts as new TextSymbol()
                        color: "white",
                        haloColor: "black",
                        haloSize: "1px",
                        text: data.data[i].SO2,
                        yoffset: -4,
                        font: {  // autocast as new Font()
                            size: 10,
                            family: "sans-serif",
                            weight: "normal"
                        }
                    }
                    if(nextProps !== undefined && nextProps !== null && nextProps !==""){
                        if(JSON.stringify(nextProps.hoverInfobar) !=="{}" ){
                            textSymbol.text=data.data[i][nextProps.hoverInfobar.Infor.sign]
                        }}

                    if (data.data[i].type === "rank1") {
                        symbol = {
                            angle: "1",
                            type: "picture-marker",
                            url: `${Group10}`,
                            width: "32px",
                            height: "40px"
                        }

                    } else if (data.data[i].type === "rank2") {
                        symbol = {
                            type: "picture-marker",
                            url: `${Group11}`,
                            width: "32px",
                            height: "40px"
                        }
                    } else if (data.data[i].type === "rank3") {
                        symbol = {
                            type: "picture-marker",
                            url: `${Group12}`,
                            width: "32px",
                            height: "40px"
                        }
                    } else if (data.data[i].type === "rank4") {
                        symbol = {
                            type: "picture-marker",
                            url: `${Group13}`,
                            width: "32px",
                            height: "40px"
                        }
                    } else {
                        symbol = {
                            type: "picture-marker",
                            url: `${Group14}`,
                            width: "32px",
                            height: "40px"
                        }
                    }
                    pms = new Graphic({
                        geometry: point,
                        symbol: symbol,
                        attributes: PointAtt,
                        popupTemplate: {
                            title: "{Name}",
                            content: "{Desc}"
                        }
                    })
                    pmsText = new Graphic({
                        geometry: point,
                        symbol: textSymbol
                    })
                    graphicsLayer.add(pms);
                    textLayer.add(pmsText);
                }
            })
              if(nextProps !== undefined && nextProps !== null && nextProps !==""){
                if(JSON.stringify(nextProps.handleInfo) !=="{}" ){
                    var longitude = nextProps.handleInfo.longitude;
                    var latitude = nextProps.handleInfo.latitude;
                    var name = nextProps.handleInfo.name;
                    var desc = nextProps.handleInfo.desc;
                    centerParams = [longitude,latitude];
                    appConfig.mapView.center = centerParams;
                    appConfig.sceneView.center = centerParams;
                    appConfig.activeView.center = centerParams;

                    var point = new Point(centerParams[0], centerParams[1]);
                    let attribute = {
                        Name:name,
                        Desc:desc
                    }
                    addGraphicsToMap(point,true,attribute);
                }

              }
            function addGraphicsToMap(geometry,flash,attribute) {
                var symbol = null;
                if (geometry.type === "point") {
                    symbol = new SimpleMarkerSymbol({
                        style: "square",
                        color: "red",
                        size: "15px",
                        outline: {
                            color: [255, 255, 0],
                            width: 2
                        }
                    });
                }
               var _graphics = new Graphic({
                   geometry:geometry,
                   symbol:symbol,
                   attributes:attribute,
                   popupTemplate:{
                       title: "{Name}",
                       content: "{Desc}"
                   }
               })
                _graphics.getEffectivePopupTemplate()
                // var _graphics_mapView = appConfig.mapView.graphics.add(_graphics);
                // var _graphics_sceneView = appConfig.sceneView.graphics.add(_graphics);

                var layer = new GraphicsLayer({
                    graphics: [_graphics]
                });
                map.layers.add(layer);
                if(flash){
                    var tempTime=0;
                    layer.visible = false
                    var handler = null;
                    handler=setInterval(function () {
                        if(tempTime === 8){
                            if(handler){
                                if(!layer.visible){
                                    layer.visible = true;
                                }
                                clearInterval(handler);
                                handler =null;
                            }
                            return;
                        }
                        if(layer.visible){
                            layer.visible = false;
                        }
                        else{
                            layer.visible = true;
                        }
                        tempTime++;
                    },500);

                }
            }
            //清空graphics
            function clearGraphics() {
                map.graphics.clear();
                var  graphicsLayerIds = map.graphicsLayerIds;
                var len = graphicsLayerIds.length;
                for(var i=0;i<len;i++){
                    var gLayer = map.getLayer(graphicsLayerIds[i]);
                    gLayer.clear();
                }
            }
        })
    }

    render() {
        return (
            <div>
                <div
                    ref={(dom) => {
                        this.viewDiv = dom
                    }}
                    className="viewDiv"
                    style={{width: "100%", height: "100vh"}}
                >
                </div>
                <div id="infoDiv">
                    <input className="esri-component esri-widget--button esri-widget esri-interactive"
                           type="button"
                           id="switch-btn"
                           value="3D"
                           ref={(input) => {
                               this.input = input
                           }}
                    />
                </div>
            </div>
        )
    }
}
