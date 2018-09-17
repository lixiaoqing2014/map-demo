import React, { Component } from "react";
import "./header.scss";

import { Link } from "react-router-dom";

import iconProjectName from "image/logo.png";
import iconUser from "image/Bitmap@1x.png";
import iconQuit from "image/quit.png";

const navItem = [
  { name: "舆情分析", url: "/concensus"},
  // { name: "综合分析", url: "/comprehensive"},
  //{ name: "一源一档", url: "/record"},
  // { name: "资源目录", url: "/resource"},
];

class Header extends Component {
  constructor (props) {
    super(props);
  }

  render() {
  	const { pathname } = this.props.location;

	  return(
	    <div>
	      <header className="header-container">
	        <div className="project-name">
	          <img src={iconProjectName}  alt="此处应有图片"></img>
	        </div>

	        <div className="user">
	          <img src={iconUser} className="login-pic" alt="此处应有图片"></img>
	          <div className="login-name clickable">
              李建
	          </div>
	          <Link to="/">
	            <div className="quit clickable">
	              <img src={iconQuit} alt="此处应有图片"></img>
	            </div>
	          </Link>
	        </div>

	        <div className="nav" id="page-nav">
            {
              navItem.map( item => {
                return (
                  <div className={"nav-item " + (pathname.indexOf(item.url)!== -1 ? "active" : "")}
											 key={item.url} >
                    <Link to={item.url}>{item.name}</Link>
                    <div className={pathname.indexOf(item.url)!== -1 ? "nav-arrows" : ""}></div>
                  </div>
                )
              })
            }
	        </div>
	      </header>
	      <div className="main-page">
	        {this.props.children}
	      </div>
	    </div>
	  )
  }
}

export default Header;
