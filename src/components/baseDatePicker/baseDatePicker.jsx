import React, {Component} from "react";
import "./baseDatePicker.scss";
import Moment from "moment";
import PropTypes from "prop-types";
import CommonFunc from "components/global/commonFunc";

const TABLE_TYPE = {
  YEAR: 0,
  MONTH: 1,
  DAY: 2,
  HOUR: 3,
  MIN: 4,
  SEC: 5
};
const TOTAL_YEAR = 12;
const TOTAL_MONTH = 12;
const TOTAL_HOURS = 24;
const TOTAL_MINUTES = 60;
const TOTAL_SECONDS = 60;
const WEEK_DAY = 7;
const DATE_TIME_TYPE = {
  "YEAR": [true, false, false, false, false, false],
  "MONTH": [true, true, false, false, false, false],
  "DAY": [true, true, true, false, false, false],
  "HOUR": [true, true, true, true, false, false],
  "MIN": [true, true, true, true, true, false],
  "SEC": [true, true, true, true, true, true],
};
const TIME_TABLE_TITLE = [ "请选择小时", "请选择分钟", "请选择秒钟" ];
const TABLE_CLASS = [ "my-year-table", "my-month-table", "my-date-table", "my-hour-table", "my-min-table", "my-sec-table" ];
const totalValue = [ TOTAL_YEAR, TOTAL_MONTH, 0, TOTAL_HOURS, TOTAL_MINUTES, TOTAL_SECONDS ];
const rouNum = [ 4, 4, 0, 6, 10, 10];

class BaseDatePicker extends Component {
  constructor(props) {
    super(props);
    this.isSetNowTimeEnabled = false;
    this.inited = false;
    this.state = {
      table: null,
      header: null,
      headerTitle: null,
      chooseResult: [],
      checkedDate: [],
      yearList: {
      	startYear: (new Date()).getFullYear() - TOTAL_YEAR + 1,
        endYear: (new Date()).getFullYear(),
      },
      timeEnabled: DATE_TIME_TYPE[this.props.type],
    }
  }

  setNextTable = (classIndex) => {
    let nextTable = classIndex;

    if (classIndex !== TABLE_TYPE.DAY && this.state.timeEnabled[classIndex + 1]) {
      nextTable += 1;
    } else if (nextTable > TABLE_TYPE.DAY) {
      nextTable = TABLE_TYPE.DAY;
    }

    return nextTable;
  };

	dealCrossYear = (chooseDate, isPlus = true) => {
	  let dealDate = [...chooseDate];
	  dealDate[TABLE_TYPE.MONTH] = isPlus ? (dealDate[TABLE_TYPE.MONTH]+1) : (dealDate[TABLE_TYPE.MONTH]-1);

	  if (dealDate[TABLE_TYPE.MONTH] <= 0) {
	    dealDate[TABLE_TYPE.MONTH] = TOTAL_MONTH;
	    dealDate[TABLE_TYPE.YEAR] -= 1;
	  } else if (dealDate[TABLE_TYPE.MONTH] > TOTAL_MONTH) {
	    dealDate[TABLE_TYPE.MONTH] = 1;
	    dealDate[TABLE_TYPE.YEAR] += 1;
	  }

	  return dealDate;
	};

	setResultByClickValue = (classIndex, className, value) => {
	  let chooseResult = [...this.state.chooseResult];
	  let nextTable = this.setNextTable(classIndex);

	  chooseResult[classIndex] = parseInt(value);
	  if ( classIndex === TABLE_TYPE.YEAR) {
	  	this.setState({ chooseResult }, ()=>this.changeDate(nextTable));
	    return;
	  } else if ( classIndex === TABLE_TYPE.DAY ) {
	    if ( className === "prev-month" ) {
	      chooseResult = this.dealCrossYear(chooseResult, false);
	    }
	    else if ( className === "next-month" ) {
	      chooseResult = this.dealCrossYear(chooseResult, true);
	    }
	    let compareDate = [...chooseResult];
	    compareDate[TABLE_TYPE.MONTH] -= 1;
	    if ( (Moment().startOf("days")).diff(Moment(compareDate).startOf("days"), "days") >= 0) {
	      if (chooseResult[TABLE_TYPE.HOUR] > (new Date()).getHours()) {
	      	chooseResult[TABLE_TYPE.HOUR] = (new Date()).getHours()
	      }
	      chooseResult[TABLE_TYPE.MIN] = 0;
	      chooseResult[TABLE_TYPE.SEC] = 0;
	    }
	  }

	  this.setState({ chooseResult }, ()=>this.changeDate(nextTable));
	};

  judgeDisabledDate = (time) => {
  	const { disableDate } = this.props;
    let judgeTime = [...time];
    judgeTime[TABLE_TYPE.MONTH] -= 1;
    let utc = Moment(judgeTime).utc()._d;
    return (typeof disableDate === "function") ? disableDate(utc) : false;
  };

  judgeTodayItem = (time) => {
  	let now = new Date();
    let nowDate = [ now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0 ];
    let judgeTime = [...time.slice(0, 3), 0, 0, 0];
    judgeTime[TABLE_TYPE.MONTH] -= 1;

    return JSON.stringify(judgeTime) === JSON.stringify(nowDate);
  };

  chooseDate = (e) => {
    let className = e.target.className;
    if ( e.target.tagName !== "TD" || className.indexOf("disabled") !== -1 ) return false;

    let classIndex = TABLE_CLASS.indexOf(e.currentTarget.className);
    this.setResultByClickValue(classIndex, className, e.target.innerHTML);
  };

	initDayList = (rowNum = 6, rowItemNum = 7) => {
	  const { chooseResult, checkedDate } = this.state;
	  let monthDays = [31, (28 + this.isLeapYear(chooseResult[TABLE_TYPE.YEAR])),
	    31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	  let selectedYear = chooseResult[TABLE_TYPE.YEAR];
	  let selectedMonth = chooseResult[TABLE_TYPE.MONTH] - 1;
	  let prevMonthTotalDate = monthDays[selectedMonth - 1] || 31;
	  let list = [];
	  let prevDate = [];
	  let startDate = 1;
	  let nextDate = 1;
	  let utc = Moment([selectedYear, selectedMonth, 1]).utc();
	  let day = (new Date(utc)).getDay();
	  if (day === 0) day = WEEK_DAY;

	  let prevDateTime = this.dealCrossYear(chooseResult, false);
	  let nowDateTime = [...chooseResult];
	  let nextDateTime = this.dealCrossYear(chooseResult, true);

	  for ( let i = 0; i < day; i++) {
	    prevDate.unshift(prevMonthTotalDate--);
	  }

	  list.push(<tr key={rowNum}><th>日</th><th>一</th><th>二</th>
	    <th>三</th><th>四</th><th>五</th><th>六</th></tr>);

	  for(let i = 0; i < rowNum; i++) {
	    let rowList = [];
	    for(let j = 0; j < rowItemNum; j++) {
	      if ( prevDate.length > 0 ) {
	        prevDateTime[TABLE_TYPE.DAY] = prevDate[0];
	      	let className = (this.judgeDisabledDate(prevDateTime) ? "disabled" : "prev-month");
	        rowList.push(<td key={prevDate[0]} className={className}>{prevDate[0]}</td>);
	        prevDate.shift();
	      } else if (startDate <= monthDays[selectedMonth]) {
	        nowDateTime[TABLE_TYPE.DAY] = startDate;
	      	let className = (this.judgeDisabledDate(nowDateTime) ? "disabled" : "")
						+ (JSON.stringify(nowDateTime) === JSON.stringify(checkedDate) ? " checked" : "")
						+ (this.judgeTodayItem(nowDateTime) ? " today" : "");
	        rowList.push(<td key={startDate} className={className}>{startDate}</td>);
	        startDate++;
	      } else {
	        nextDateTime[TABLE_TYPE.DAY] = nextDate;
	        let className = (this.judgeDisabledDate(nextDateTime) ? "disabled" : "next-month");
	        rowList.push(<td key={nextDate} className={className}>{nextDate}</td>);
	        nextDate++;
	      }
	    }
	    list.push(<tr key={i}>{rowList}</tr>);
	  }
	  return list
	};

  initDateTimeList = (total, rowNum, tableType, baseValue = 0) => {
  	const { chooseResult, checkedDate } = this.state;
  	let value = tableType === TABLE_TYPE.MONTH ? (baseValue + 1) : baseValue;
    let maxValue = total + value;
    let rowItemNum = total / rowNum;
    let list = [];
    let nowDateTime = [...chooseResult];

    for(let i = 0; i < rowNum; i++) {
      let rowList = [];
		  for(let j = 0; j < rowItemNum; j++) {
		    if (value >= maxValue) break;
		    let show = tableType === TABLE_TYPE.MONTH ? (value + "月") : value;
        nowDateTime[tableType] = value;
		    let className = (this.judgeDisabledDate(nowDateTime) ? "disabled" : "")
				+ (JSON.stringify(nowDateTime) === JSON.stringify(checkedDate) ? " checked" : "");
		    rowList.push(<td key={value} className={className}>{show}</td>);
        value++;
      }
      list.push(<tr key={i}>{rowList}</tr>);
    }
    return list
  };

	setTableShow = () => {
	  this.changeDate(TABLE_TYPE.DAY, false);
	};

	setNowTime = () => {
	  if ( this.isSetNowTimeEnabled ) return false;

	  const { type } = this.props;
	  let nowDate = new Date();
	  let chooseResult = [
	    DATE_TIME_TYPE[type][0] ? nowDate.getFullYear() : 0,
	    DATE_TIME_TYPE[type][1] ? (nowDate.getMonth() + 1) : 0,
	    DATE_TIME_TYPE[type][2] ? nowDate.getDate() : 0,
	    DATE_TIME_TYPE[type][3] ? nowDate.getHours() : 0,
	    DATE_TIME_TYPE[type][4] ? nowDate.getMinutes() : 0,
	    DATE_TIME_TYPE[type][5] ? nowDate.getSeconds() : 0
	  ];
	  let yearList = {
	    startYear: nowDate.getFullYear() - TOTAL_YEAR + 1,
	    endYear: nowDate.getFullYear(),
	  };
	  let tableType = Math.min(TABLE_TYPE[type], TABLE_TYPE.DAY);
	  this.setState({ chooseResult, yearList }, ()=>this.changeDate(tableType));
	};

	setYearByMode = (isPrev = false, nowTable = TABLE_TYPE.DAY, mode = "step") => {
	  let chooseResult = [...this.state.chooseResult];
	  let yearList = {...this.state.yearList};
	  let offset = mode === "step" ? 1 : TOTAL_YEAR;
	  if ( mode !== "step") chooseResult[TABLE_TYPE.YEAR] = yearList.startYear;

	  if (isPrev) {
	    chooseResult[TABLE_TYPE.YEAR] -= offset;
	    // if (this.judgeDisabledDate(chooseResult)) return;
	    yearList.startYear -= offset;
	    yearList.endYear -= offset;
	  } else {
	    chooseResult[TABLE_TYPE.YEAR] += offset;
	    // if (this.judgeDisabledDate(chooseResult)) return;
	    yearList.startYear += offset;
	    yearList.endYear += offset;
	  }
	  if (mode === "step"){
	    this.setState({ chooseResult, yearList }, ()=>this.changeDate(nowTable, false));
	  } else {
	    this.setState({ yearList }, ()=>this.changeDate(nowTable, false));
	  }
	};

	setMonthByOneStep = (isPrev = false) => {
	  let chooseResult = this.dealCrossYear(this.state.chooseResult, !isPrev);
	  // if (this.judgeDisabledDate(chooseResult)) return;
	  this.setState({ chooseResult }, ()=>this.changeDate(TABLE_TYPE.DAY, false))
	};

	changeDate = (type, isSetDate = true) => {
	  if (typeof this.props.onChange === "function" && this.inited && isSetDate) {
	    this.props.onChange(this.state.chooseResult);
	    this.setState({ checkedDate: this.state.chooseResult}, () => {
	      this.toggleTable(type);
	      this.refreshHeader(type);
	    });
	    return;
	  }
	  this.inited = true;
	  this.toggleTable(type);
	  this.refreshHeader(type);
	};

	isLeapYear = (year) => {
	  return ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0) ? 1 : 0);
	};

	confirmDate = () => {
	  if (typeof this.props.onConfirm === "function") {
	  	this.props.onConfirm();
	  }
	};

	initTimeArea = () => {
	  const { type } = this.props;
	  let initTableIndex = Math.min(TABLE_TYPE[type], TABLE_TYPE.DAY);

	  this.setState({
	    timeEnabled: DATE_TIME_TYPE[type],
	  }, ()=> this.changeDate(initTableIndex, false))
	};

	componentWillMount () {
	  const { value, disableDate } = this.props;
	  let initValue = [0, 0, 0, 0, 0, 0];
	  this.isSetNowTimeEnabled = (typeof disableDate !== "undefined");
	  initValue = [...value, ...initValue.slice(value.length, 6)];
	  this.setState({ chooseResult: initValue, checkedDate: initValue }, this.initTimeArea)
	}

	refreshHeader = (type) => {
	  const { chooseResult } = this.state;
	  let header = null;

	  switch (type) {
	  case TABLE_TYPE.YEAR: {
	    const { yearList } = this.state;
	    header = <div>
	      <a className="my-calendar-prev-year-btn" title="上一年" onClick={()=>this.setYearByMode(true, TABLE_TYPE.YEAR, "page")}>{"<<"}</a>
	      <span>{`${yearList.startYear}年 - ${yearList.endYear}年`}</span>
	      <a className="my-calendar-next-year-btn" title="下一年" onClick={()=>this.setYearByMode(false, TABLE_TYPE.YEAR, "page")}>{">>"}</a>
	    </div>;
	    break;
	  }
	  case TABLE_TYPE.MONTH:
	    header = <div>
	      <a className="my-calendar-prev-year-btn" title="上一年" onClick={()=>this.setYearByMode(true, TABLE_TYPE.MONTH)}>{"<<"}</a>
	      <span className="my-year-select" onClick={()=>this.changeDate(TABLE_TYPE.YEAR, false)}>{`${chooseResult[TABLE_TYPE.YEAR]}年`}</span>
	      <a className="my-calendar-next-year-btn" title="下一年" onClick={()=>this.setYearByMode(false, TABLE_TYPE.MONTH)}>{">>"}</a>
	    </div>;
	    break;
	  case TABLE_TYPE.DAY:
	    header = <div>
	      <a className="my-calendar-prev-year-btn" title="上一年" onClick={()=>this.setYearByMode(true)}>{"<<"}</a>
	      <a className="my-calendar-prev-month-btn" title="上个月" onClick={()=>this.setMonthByOneStep(true)}>{"<"}</a>
	      <span className="my-calendar-date-select">
	        <a className="my-year-select" onClick={()=>this.changeDate(TABLE_TYPE.YEAR, false)}>{`${chooseResult[TABLE_TYPE.YEAR]}年 `}</a>
	        <a className="my-month-select" onClick={()=>this.changeDate(TABLE_TYPE.MONTH, false)}>{`${CommonFunc.dateTimeFormat(chooseResult[TABLE_TYPE.MONTH])}月 `}</a>
	        <a className="my-day-select" onClick={()=>this.changeDate(TABLE_TYPE.DAY, false)}>{`${CommonFunc.dateTimeFormat(chooseResult[TABLE_TYPE.DAY])}日 `}</a>
	      </span>
	      <a className="my-calendar-next-month-btn" title="下个月" onClick={()=>this.setMonthByOneStep(false)}>{">"}</a>
	      <a className="my-calendar-next-year-btn" title="下一年" onClick={()=>this.setYearByMode(false)}>{">>"}</a>
	    </div>;
	    break;
	  case TABLE_TYPE.HOUR:
	  case TABLE_TYPE.MIN:
	  case TABLE_TYPE.SEC:
	    header = <div>
	      <span>{TIME_TABLE_TITLE[type - TABLE_TYPE.HOUR]}</span>
	      <a className="my-calendar-cancel" title="取消" onClick={this.setTableShow}>{"X"}</a>
	    </div>;
	    break;
	  default: break;
	  }
	  this.setState({ header });
	};

  toggleTable = (type) => {
    let baseValue = (type === TABLE_TYPE.YEAR) ? this.state.yearList.startYear : 0;
    let table = <table className={TABLE_CLASS[type]} onClick={(e) => this.chooseDate(e)}>
      <tbody>
        {
          (type !== TABLE_TYPE.DAY) ?
            this.initDateTimeList(totalValue[type], rouNum[type], type, baseValue)
            : this.initDayList()
        }
      </tbody>
    </table>;
    this.setState({ table });
  };

  render () {
    const { chooseResult, timeEnabled } = this.state;
    let timeItem = [ TABLE_TYPE.HOUR, TABLE_TYPE.MIN, TABLE_TYPE.SEC ];

    return (
      <div className="my-calendar">
        <div className="my-calendar-date-panel">
          <div className="my-calendar-header">
            {this.state.header}
          </div>
          <div className="my-calendar-body">
            {this.state.table}
          </div>
          <div className="my-calendar-footer">
            <span className="my-calendar-time-select">
              {
                timeItem.map((item) => {
                  return (
                    <span key={item}>
                      <input type="text"
														 className={(timeEnabled[item] ? "" : "time-disabled")}
														 value={timeEnabled[item] ? CommonFunc.dateTimeFormat(chooseResult[item]) : "00"}
														 name={item}
														 maxLength="2"
														 readOnly="readonly"
														 disabled={timeEnabled[item] ? "" : "disabled"}
														 onClick={()=>this.changeDate(item, false)}
                      />
                      { (item < TABLE_TYPE.SEC) ? <span>{" : "}</span> : null }
                    </span>
                  )
                })
              }
            </span>
            <span className="my-calendar-footer-btn">
              <a className={(this.isSetNowTimeEnabled ? "hidden" : "")} onClick={this.setNowTime}>此刻</a>
              <a className="my-calendar-confirm-btn" onClick={this.confirmDate}>确定</a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

BaseDatePicker.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  type: PropTypes.oneOf(["YEAR", "MONTH", "DAY", "HOUR", "MIN", "SEC"]),
  disableDate: PropTypes.func,
};

BaseDatePicker.defaultProps = {
  type: "SEC",
  value: [
    (new Date()).getFullYear(),
    (new Date()).getMonth() + 1,
    (new Date()).getDate(),
    (new Date()).getHours(),
    (new Date()).getMinutes(),
    (new Date()).getSeconds(),
  ],
};

export default BaseDatePicker;
