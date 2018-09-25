import React, { Component } from "react"
import "./Mapview.scss"
import { loadModules } from "react-arcgis"
// import { loadModules } from "../../../../../public/data/data"
var data = [  //json数据
	{  
	    "name":"长城", 
	    "x":116.016033, 
	    "y":40.364233,  
	    "desc":"长城（Great Wall），又称万里长城，是中国古代的军事防御工程，是一道高大、坚固而连绵不断的长垣，用以限隔敌骑的行动。长城不是一道单纯孤立的城墙，而是以城墙为主体，同大量的城、障、亭、标相结合的防御体系。",
	    "type":"cultureHeritage"
	},  
	{  
	    "name":"莫高窟",
	    "x":94.815602,
	    "y":40.048747,  
	    "desc":"莫高窟，俗称千佛洞，坐落在河西走廊西端的敦煌。它始建于十六国的前秦时期，历经十六国、北朝、隋、唐、五代、西夏、元等历代的兴建，形成巨大的规模，有洞窟735个，壁画4.5万平方米、泥质彩塑2415尊，是世界上现存规模最大、内容最丰富的佛教艺术地。",
	    "type":"cultureHeritage"
	},  
	{  
	    "name":"故宫",
	    "x":116.403414,
	    "y":39.924091,  
	    "desc":"北京故宫是中国明清两代的皇家宫殿，旧称为紫禁城，位于北京中轴线的中心，是中国古代宫廷建筑之精华。北京故宫以三大殿为中心，占地面积72万平方米，建筑面积约15万平方米，有大小宫殿七十多座，房屋九千余间。是世界上现存规模最大、保存最为完整的木质结构古建筑之一。",
	    "type":"cultureHeritage" 
	},  
	{  
	    "name":"秦始皇陵及兵马俑坑",
	    "x":109.289337,
	    "y":34.392294,  
	    "desc":"秦始皇陵是中国历史上第一个皇帝——秦始皇帝的陵园，也称骊山陵。兵马俑坑是秦始皇陵的陪葬坑，位于陵园东侧1500米处。其规模之大、陪葬坑之多、内涵之丰富，为历代帝王陵墓之冠。",
	    "type":"cultureHeritage"
	},
	{  
	    "name":"周口店北京人遗址",
	    "x":115.938822,
	    "y":39.696296,  
	    "desc":"周口店遗址博物馆坐落在北京城西南房山区周口店龙骨山脚下，是一座古人类遗址博物馆，始建于1953年。1929年，中国古人类学家裴文中先生在龙骨山发掘出第一颗完整的“北京猿人”头盖骨化石，震撼了全世界。",
	    "type":"cultureHeritage"
	},
	{  
	    "name":"拉萨布达拉宫历史建筑群",
	    "x":91.125103,
	    "y":29.660384,  
	    "desc":"布达拉宫（藏文：??????，藏语拼音：bo da la，威利：po ta la），坐落于于中国西藏自治区的首府拉萨市区西北玛布日山上，是世界上海拔最高，集宫殿、城堡和寺院于一体的宏伟建筑，也是西藏最庞大、最完整的古代宫堡建筑群。",
	    "type":"cultureHeritage" 
	},
	{  
	    "name":"峨眉山-乐山大佛",
	    "x":103.450213,
	    "y":29.575827,  
	    "desc":"峨眉山（Mount Emei）山头位于中国四川省乐山市峨眉山市境内，是中国“四大佛教名山”之一，地势陡峭，风景秀丽，素有“峨眉天下秀”之称，山上的万佛顶最高，海拔3099米，高出峨眉平原2700多米。《峨眉郡志》云：“云鬘凝翠，鬒黛遥妆，真如螓首蛾眉，细而长，美而艳也，故名峨眉山。”",
	    "type":"doubleHeritage"
	},
	{  
	    "name":"九寨沟国家级自然保护区",
	    "x":103.925277,
	    "y":33.273815,  
	    "desc":"九寨沟：世界自然遗产、国家重点风景名胜区、国家AAAAA级旅游景区、国家级自然保护区、国家地质公园、世界生物圈保护区网络，是中国第一个以保护自然风景为主要目的的自然保护区。",
	    "type":"natureHeritage"
	}   
];  

export default class MapVIew extends Component {
    componentDidMount() {
    }
    mapDom() {
        loadModules(["esri/Map",
            "esri/views/MapView",
            "esri/views/SceneView",
            "esri/widgets/Search",
            "esri/layers/TileLayer",
            "esri/geometry/Point",
            "esri/layers/GraphicsLayer",
            "esri/Graphic",
            "dojo/_base/Color",
            "dojo/domReady!"
        ]).then(([Map, MapView, SceneView, Search,TileLayer,Point,GraphicsLayer,Graphic,Color]) => {

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
            var tiled = new TileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer",{"id":"tiled"});
            map.add(tiled);
            // var mapCenter = new Point(103.847, 36.0473, {"wkid":4326});
            // map.centerAndZoom(mapCenter,3);

            var gLyr = new GraphicsLayer({"id":"gLyr"});
            map.add(gLyr);
            var gLyrLbl = new GraphicsLayer({"id":"gLyrLbl"});
            map.add(gLyrLbl);


            map.on("load",function(){
                for(var i=0;i<data.length;i++){

                    var pt = new Point(data[i].x,data[i].y,{"wkid":4326});
                    var pms;
                    if (data[i].type=="natureHeritage") {
                        pms = new esri.symbol.PictureMarkerSymbol(require("../../../../image/env/weather/10.png"),30,30);
                    }else if (data[i].type=="cultureHeritage") {
                        pms = new esri.symbol.PictureMarkerSymbol(require("../../../../image/env/weather/10.png"),30,30);
                    }else if (data[i].type=="doubleHeritage") {
                        pms = new esri.symbol.PictureMarkerSymbol(require("../../../../image/env/weather/10.png"),30,30);
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
