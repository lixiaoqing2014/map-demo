/*
created by wy;
*/

import React, { Component } from "react";
import "./table.scss";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import defalutSettings from "./settings.json";
import { POLLUTE_NAME_TABLE } from "components/global/globalConst";

class EnvTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: [],
      selected: false
    };
  }
  render() {
    /*
        @ props params
        columns 可以接收对象，或者字符串。字符串为默认表头配置，传入对象可以设置表头。
        */
    let column = this.props.column;
    let data = this.props.data;
    if (!column) {
      console.log(
        "There needs data who called 'column' for this table components."
      );
      return false;
    }
    if (!data) {
      console.log(
        "There needs data who called 'data' for this table components."
      );
      return false;
    }
    let columndata = [];
    let columnsetting = []; //存储列设置
    // 对列设置进行判断
    column.map((item, index) => {
      let columnObj = {};
      columnObj.settings = defalutSettings.defalutColumn;
      columnObj.name = item.name;
      columnsetting.push(columnObj);
      columndata.push(item.column);
    });
    return (
      <div className="env-table-container">
        <div className="table-header">
          {columnsetting.map((item, index) => {
            return (
              <div style={item.settings} key={index}>
                {item.name}
              </div>
            );
          })}
        </div>
        <div className="table-body">
          {data.map((item, index) => {
            let length = columndata.length;
            let temple = [];
            for (let i = 0; i < length; i++) {
              temple.push(<div key={i}>
                {item[columndata[i]] === null ? "--" : (POLLUTE_NAME_TABLE[item[columndata[i]]] || item[columndata[i]])}
              </div>
              );
            }
            return (
              <div className="table-column" key={index}>
                {temple}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default connect(
  state => ({
    UIData: state.UIData
  }),
  {}
)(EnvTable);
