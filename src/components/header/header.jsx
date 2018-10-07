import React, {Component} from "react";
import "./header.scss";
import {Link} from "react-router-dom";
import iconUser from "image/Bitmap@1x.png";
import logo from "image/S_logo.png"
import {Dropdown} from "element-react";
import "element-theme-default";


const navItem = [
    {name: "首页", url: "/index"},
    {name: "环境监测网", url: "/environmentMonitor"},
    {name: "原清单", url: "/originalList"},
    {name: "气象观测与预报", url: "/sceneLookforecast"},
    {name: "全面举报", url: "/totalReport"},
    {name: "数据研判", url: "/totalDevelop"}
];

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {pathname} = this.props.location;
        return (
            <div className="page">
                <header className="header-container">
                    <div className="project-name">
                        <img src={logo}/>智慧环保一张图系统
                    </div>
                    <div className="user">
                        <img src={iconUser} className="login-pic" alt="此处应有图片"></img>

                            <Dropdown menu={(
                                <Dropdown.Menu>
                                    <Dropdown.Item>个人中心</Dropdown.Item>
                                    <Dropdown.Item>修改密码</Dropdown.Item>
                                    <Dropdown.Item>安全退出</Dropdown.Item>
                                </Dropdown.Menu>
                            )}
                            >
                      <div className="el-dropdown-link">
                          <div className="login-name clickable">
                            李建<span className="trangle"></span>
                        </div>

                      </div>
                            </Dropdown>

                    </div>

                    <div className="nav" id="page-nav">
                        {
                            navItem.map(item => {
                                return (
                                    <div className={"nav-item " + (pathname.indexOf(item.url) !== -1 ? "active" : "")}
                                         key={item.url}>
                                        <Link to={item.url}>{item.name}</Link>
                                        <div className={pathname.indexOf(item.url) !== -1 ? "nav-arrows" : ""}></div>
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
