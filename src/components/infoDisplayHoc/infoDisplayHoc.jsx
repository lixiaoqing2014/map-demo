import React, { Component } from "react";

function getDisplayName(component) {
  return component.displayName ||component.name || "Component"
}
const infoDisplayHoc = (title, infoStyle={}, titleStyle={}) => (WrappedComponent) =>
  class HOC extends Component {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
    render() {
      const titleStyleDefault = {
        marginBottom: "0.20rem",
        lineHeight: "0.24rem",
        color: "#00a3ff",
        fontSize: "0.24rem",
        height: "0.24rem"
      };
      const infoStyleDefault = {
        height: "3.63rem",
        backgroundColor: "#0a2958",
        marginBottom: "0.37rem",
      };

      return (
        <div>
          <div style={{...titleStyleDefault, ...titleStyle}}>{title || ""}</div>
          <div style={{...infoStyleDefault, ...infoStyle}}>
            <WrappedComponent {...this.props}/>
          </div>
        </div>
      )
    }
  };

export default infoDisplayHoc;