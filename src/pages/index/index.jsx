import React from "react"
import "./index.css"
import {Layout} from "element-react";
import "element-theme-default";
import LeftMapBar from "./components/LeftMapBar/LeftMapBar";
import RightMapBar from "./components/RightMapBar/RightMapBar";
const Index = (props) => {
    return (
        <div className="am-container">
            <div>
                <Layout.Row gutter="20">
                    <Layout.Col span="16">
                        <div className="grid-content bg-purple">
                            <LeftMapBar />
                        </div>
                    </Layout.Col>
                    <Layout.Col span="8">
                        <div className="grid-content bg-purple">
                            <RightMapBar />
                        </div>
                    </Layout.Col>
                </Layout.Row>
            </div>

        </div>
    )
}

export default Index