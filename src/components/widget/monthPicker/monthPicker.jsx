import React, { Component } from "react";
import "./monthPicker.css";

import { connect } from "react-redux";
import { changeDropDownSelect } from "store/globalWidget/action";

class MonthPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectList: ["烟尘", "SO2", "NOX", "COD", "氨氮"],
      selected: false,
    };
  }

	toggleSelect = () => {
	  this.setState((preState) => {
    	return {
    		selected: !preState.selected
    	};
	  });
	}

	selectItem = (e) => {
	  let target = e.currentTarget.innerHTML;
	  let newSelectList = this.state.selectList.filter(item => item !== target)
	  newSelectList.unshift(target);
	  this.setState({
	    selectList: newSelectList
	  });
		
	  this.props.changeDropDownSelect(this.props.id, target);
	}

	componentDidMount() {
	  this.setState({
	    selectList: this.props.content
	  })
	}

	render() {
	  return (
	    <div className="drop-down-button-container" onClick={this.toggleSelect}>
			  <div className="button">
			    {this.state.selectList[0]}
			    <div className="triangle-wrapper">
			    {
			    	this.state.selected ? (
			    		<div className="triangle-up"></div>
			    	) : (
			        <div className="triangle-down"></div>
			      )
			    }
			    </div>
			  </div>
			  <div className={"drop-down-box" + (this.state.selected ? "":" hidden")}>
			  {
			  	this.state.selectList.slice(1).map((item, index) => {
			  		return (
			  			<span className="box-item" onClick={this.selectItem}>
			  			{item}
			  			</span>
			  		)
			  	})
			  }
			  </div>
	    </div>
	  )
	}
}

export default connect(state => ({
  pollutionMonitorData: state.pollutionMonitorData
}), {
  changeDropDownSelect,
})(MonthPicker);

