  
import React from "react";  
import "./ConfirmWinsOnekeyReport.css";

import InfiniteCalendar, {Calendar, withRange} from "react-infinite-calendar";
import "react-infinite-calendar/styles.css"; // only needs to be imported once

import MonthPicker from "components/widget/monthPicker/monthPicker";

import { connect } from "react-redux";

  
class ConfirmWinsOnekeyReport extends React.Component {  
  constructor(props) {  
    super(props); 

    let rootFontSize = parseInt(this.props.UIData.rootFontSize, 10);

    this.state={
      isMonthSelect: false,
      isEnterprise: false,
      value: "coconut",
      calendarWidth: rootFontSize * 2.6,
      calendarHeight: rootFontSize * 2.8,

      enterprisename: "",
      chosetimespan: "",
      pollutionLetTotalDropDownConent: ["烟尘", "SO2", "NOX", "COD", "氨氮"],
    }

    this.handleChange = this.handleChange.bind(this);
  }
  
  
  handleChange(event) {

    this.setState({value: event.target.value});

    if(event.target.value === "countryReport"){

      this.setState({isMonthSelect: false});

    }else if(event.target.value === "enterpriseReport"){

      this.setState({isMonthSelect: true});

    }
  }

  
  render() {  
    const reportConfirm = {  
      title: "一键报表",  
      messageDetails:[
        {region:"滁州市",name1:"赵小敏"},
        {region:"明光市",name1:"徐开阳"},
      ],
      leftBtn: {  
        text: "导出"  
      }
    };  

    // Render the Calendar


    let MonthSelect = null;


    let EnterpriseDiv = null;


    if (this.state.isMonthSelect) {
      MonthSelect = <MonthPicker content={this.state.pollutionLetTotalDropDownConent}/>;


      EnterpriseDiv = 
        <div className="table-row">
          <div className="labelreport">企业名称</div>
          <div className="formitem">
            <input type="text" value={this.state.enterprisename} onChange={this.handleEnterpriseNameChange} />                      
          </div>
        </div>


    } else {
      MonthSelect = <InfiniteCalendar
        Component={withRange(Calendar)}
        width={this.state.calendarWidth}
        height={this.state.calendarHeight}
        displayOptions={{
          showHeader: false
        }}
        theme={{
          selectionColor: "rgb(146, 118, 255)",
          textColor: {
            default: "#333",
            active: "#FFF"
          },
          weekdayColor: "rgb(146, 118, 255)",
          headerColor: "rgb(127, 95, 251)",
          floatingNav: {
            background: "rgba(81, 67, 138, 0.96)",
            color: "#FFF",
            chevron: "#FFA726"
          }
        }}
      />;

      EnterpriseDiv = null;
    }

    return (  
      <div className="confirm-wins-report-container">  
        <div className="wins">  
          <div className="title">{reportConfirm.title}</div>  
          <div className="desc gray-text96">{reportConfirm.desc}</div> 

          <div className="content">
            <div className="table-row">
              <div className="labelreport">选择报表类型</div>
              <div className="formitem">                                           
                <select className="selectreport" value={this.state.value} onChange={this.handleChange}>
                  <option selected value="countryReport">{this.props.optionContent[0]}</option>
                  <option value="enterpriseReport">{this.props.optionContent[1]}</option>
                </select>                     
              </div>
            </div>
            {EnterpriseDiv}
            <div className="table-row">
              <div className="labelreport">选择时间段</div>
              <div className="formitem">
                <input type="text" value={this.state.chosetimespan} onChange={this.handleChoseTimespanChange}/>                               
              </div>
            </div>
          </div>
          <div className="daysselect">
            {MonthSelect}
          </div>
          <div className="fn-btn text-center">
            <div className="btn left-btn clickable" onClick={this.props.onLeftClick}>{reportConfirm.leftBtn.text}</div>
          </div>
        </div>  
      </div>  
    );  
  }  
}  
  
ConfirmWinsOnekeyReport.propTypes = {  
  // title: React.PropTypes.string.isRequired,  
  // desc: React.PropTypes.string.isRequired,  
  // leftBtn: React.PropTypes.object,  
  // rightBtn: React.PropTypes.object.isRequired,  
  // onLeftClick: React.PropTypes.func,  
  // onRightClick: React.PropTypes.func.isRequired,  
}; 

export default connect(state => ({
  UIData: state.UIData
}), {
})(ConfirmWinsOnekeyReport);

