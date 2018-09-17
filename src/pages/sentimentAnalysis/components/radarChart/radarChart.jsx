import React, { Component } from "react";
import MyFetch from "components/global/myFetch"
import echarts from "echarts";
import CommonFunc from "components/global/commonFunc"
import {sentimentApi} from "components/global/apiGroup"
import "./radarChart.scss"

const BASE_RATE = 1.2;
const LIMI_ITEM = 3;

export default class RadarChart extends Component {
  constructor (props) {
    super(props);
    this.maxRadarNum = 0;
    this.state = {
      radarItem: [],
    };
  }

	getBaseValue = (data) => {
	  this.maxRadarNum = CommonFunc.getMaxValue(data, "num");
	};

	setRadarValue = () => {
	  let value = [];
	  let itemLen = this.state.radarItem.length;
	  let len = Math.max(LIMI_ITEM, itemLen);
	  for (let i = 0; i < len; i++) {
	    if (i >= itemLen) {
	      value.push(Math.round(0));
	    } else {
	      value.push(Math.round(this.state.radarItem[i].num));
	    }

	  }
	  return value;
	};

	setRadarindicator = () => {
	  let indicator = [];
	  let max = Math.round(this.maxRadarNum * BASE_RATE);
	  let itemLen = this.state.radarItem.length;
	  let len = Math.max(LIMI_ITEM, itemLen);
	  for (let i = 0; i < len; i++) {
	    if (i >= itemLen) {
	      indicator.push({name: "--", max});
	    } else {
	      let source = "";
	      let len = this.state.radarItem[i].source.length;
	      if ( len > 5) {
	        source = this.state.radarItem[i].source.slice(0,-(len/2 - 1)) + "\n"
						+ this.state.radarItem[i].source.slice(-(len/2 - 1)) + "(" + this.state.radarItem[i].num + "条)"
	      } else {
	        source = this.state.radarItem[i].source + "\n(" + this.state.radarItem[i].num + "条)";
	      }
	      indicator.push({name: source, max});
	    }
	  }
	  return indicator;
	};

	setRadarToolTip = (params) => {
	  let showHtm = params.seriesName + "<br>";
	  let itemLen = this.state.radarItem.length;
	  let len = Math.max(LIMI_ITEM, itemLen);
	  for (let i = 0; i <len; i++) {
	    if (i >= itemLen) {
	      showHtm += "--" + " : 0<br>";
	    } else {
	      showHtm += this.state.radarItem[i].source + " : " + params.value[i] + "<br>";
	    }
	  }
	  return showHtm;
	};

	drawRadarChart = () =>  {
	  let dom = document.getElementById("radar-chart");
	  let myChart = echarts.init(dom);

	  this.getBaseValue(this.state.radarItem);

	  let option = {
	    tooltip: {
	      trigger: "item",
	      backgroundColor: "rgba(12, 47, 107, 0.7490196078431373)",
	      formatter: (params) => this.setRadarToolTip(params)
	    },
	    radar: {
	      nameGap : 4,
	      splitNumber: 3,
	      center: ["50%","50%"],
	      name: {
	        textStyle: {
	          color: "#FFFFFF",
	          fontSize: this.props.UIData.rootFontSize * 0.16,
	        },
	      },
	      radius: "55%",
	      indicator: this.setRadarindicator(),
	      splitArea : {
	        show : true,
	        areaStyle : {
	          color: ["#00A3FF"],
	          opacity: 0.07,
	        }
	      },
	    },
	    series: [{
	      name: "近30天信访来源(条)",
	      type: "radar",
	      itemStyle: {
	        normal: {
	          color : "#28B0FA"
	        }
	      },
	      data : [
	        {
	          value : this.setRadarValue(),
	          areaStyle: {
	            normal: {
	              opacity: 0.8,
	              color: "#28B0FA"
	            }
	          },
	        },
	      ]
	    }]
	  };
	  myChart.setOption(option);
	  this.radarChart = myChart;
	};

	resize() {
	  this.radarChart && this.radarChart.resize();
	}

	postRadarData = () => {
	  MyFetch.post(sentimentApi.sourceStatistics)
	    .then((data) => {
	      this.setState({
	        radarItem: data.rows,
	      }, ()=>{ this.drawRadarChart() });
	    })
	    .catch((err) => {
	      console.log(`Fetch error: ${err}`);
	    });
	};

	componentDidMount () {
	  this.postRadarData();
	}

	componentWillReceiveProps(nextProps) {
	  if(nextProps.UIData.rootFontSize !== this.props.UIData.rootFontSize || nextProps.UIData.rootHeight !== this.props.UIData.rootHeight) {
	    this.resize();
	  }
	}

	componentWillMount () {
	  if (this.radarChart) {
	    this.radarChart.clear();
	    this.radarChart.dispose();
	  }
	}

	render () {
	  return (
	    <div className="petition-source-container">
	      <div className="header">
	        <div className="title">近30天信访来源</div>
	      </div>
	      <div className={"chart-container " + (this.state.radarItem.length > 0?"":"center")}>
	        {
	          (this.state.radarItem.length > 0) ? (
	            <div className="radar-chart" id="radar-chart"></div>
	          ) : (
	            <div className="nodata-tip">暂无数据</div>
	          )
	        }
	      </div>
	    </div>
	  );
	}

}