import React from "react";
import "./overView.scss";

function OverView (props) {

  return (
    <div className="info-overview">
      <div className="content">
        <div className="view-title">
          <span>今日新闻量<span className="important-num">{props.data.todayNewsNumber}</span>条</span>
        </div>
        <div className="view-title">
          <span>今日信访量<span className="important-num">{props.data.todayLVNumber}</span>条</span>
        </div>
        <div className="view-title">
	          <span>新闻最多
	            <span className="important-info">
              {props.data.todayMaxNewsCountyName 
                  && props.data.todayMaxNewsCountyName.substr(0, props.data.todayMaxNewsCountyName.length -1)
              		|| "--"
              }
	            </span>
            {props.data.todayMaxNewsCountyName
              && props.data.todayMaxNewsCountyName.substr(-1)
            }
	          </span>
        </div>
        <div className="view-title">
	          <span>信访最多
	            <span className="important-info">
              {props.data.todayMaxLVCountyName
                  && props.data.todayMaxLVCountyName.substr(0, props.data.todayMaxLVCountyName.length -1)
									|| "--"
              }
	            </span>
            {props.data.todayMaxLVCountyName &&
              props.data.todayMaxLVCountyName.substr(-1)
            }
	          </span>
        </div>
        <div className="view-title">
          <span>最为关注
            <span className="important-info">
              {
                props.data.mainProblems.length > 0 ? props.data.mainProblems[0] : "--"
              }
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default OverView;
