import React from "react";
import "./TopInfoMenu.scss";
import TabListCommon from "components/tabListCommon/tabListCommon"
const TAB_LIST_ITEM = [
    {title: "实计"},
    {title: "统计"}
];

function TopInfoMenu (props) {

    return (
        <div className="sentiment-top">
            <TabListCommon activeModuleIndex={props.activeModuleIndex}
                           tabListItem={TAB_LIST_ITEM}
                           onClick={props.changeTabClick}
                           width={"20%"}
            />

        </div>

    );
}

export default TopInfoMenu;
