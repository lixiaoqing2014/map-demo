import React from "react";
import "./tabListCommon.scss";

function TabListCommon (props) {
  const itemLen = props.tabListItem.length;
  const eachItemWidth = 100/itemLen;

  return (
    <div className="info-tab-list clickable" style={{width: `${props.width}`}}>
      {
        itemLen > 0 &&
        props.tabListItem.map( (item, index) => {
          return (
            <div className={props.activeModuleIndex === index ? "active" : ""}
								 style={{width: `${eachItemWidth}%`}}
              onClick={() => props.onClick(index)}
              key={item.title}>
              <img src={props.activeModuleIndex === index ? item.activeIcon : item.icon}
                alt="" />
              <span>{item.title}</span>
            </div>
          )
        })
      }
      <div className="bar"
        style={{left: `${eachItemWidth * props.activeModuleIndex}%`,
          width: `${eachItemWidth}%`}}>
      </div>
    </div>
  );
}

export default TabListCommon;
