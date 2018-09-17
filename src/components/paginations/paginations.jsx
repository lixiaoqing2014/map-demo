import React, { Component } from "react";
import { Pagination } from "element-react";
import "element-theme-default";
import "./paginations.scss"
export default class Paginations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  changePage = (page) => {
    this.props.changePage(page)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={`page ${this.props.className}`}>
        {this.props.showTotal && <div className="records">共<span>{this.props.total}</span>条记录</div>}
        <Pagination layout="prev, pager, next"
          total={this.props.total}
          pageSize={this.props.pagesize}
          currentPage={this.props.currentPage}
          className="newpage"
          onCurrentChange={this.changePage}/>
      </div>
    );
  }
}