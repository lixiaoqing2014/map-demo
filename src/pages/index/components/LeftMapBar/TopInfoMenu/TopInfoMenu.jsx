import React from "react";
import "./TopInfoMenu.scss";

import TabListCommon from "components/tabListCommon/tabListCommon";
import iconNewsActive from "image/news_active@1x.png";
import iconNews from "image/news@1x.png";
import iconPetition from "image/petition@1x.png";
import iconPetitionActive from "image/petition_active@1x.png";

const TAB_LIST_ITEM = [
    {title: "国省控监测网", activeIcon: iconPetitionActive, icon: iconPetition},
    {title: "空气质量传感网", activeIcon: iconNewsActive, icon: iconNews},
    {title: "超级站", activeIcon: iconNewsActive, icon: iconNews},
    {title: "企业在线监测", activeIcon: iconNewsActive, icon: iconNews},
    {title: "工地", activeIcon: iconNewsActive, icon: iconNews},
    {title: "渣土车", activeIcon: iconNewsActive, icon: iconNews},
    {title: "加油站", activeIcon: iconNewsActive, icon: iconNews},
    {title: "环卫车", activeIcon: iconNewsActive, icon: iconNews},
    {title: "路口卡口", activeIcon: iconNewsActive, icon: iconNews},
    {title: "视频监控", activeIcon: iconNewsActive, icon: iconNews}
];

function TopInfoMenu (props) {

    return (
        <div className="sentiment-top">
            <TabListCommon activeModuleIndex={props.activeModuleIndex}
                           tabListItem={TAB_LIST_ITEM}
                           onClick={props.changeTabClick}
                           width={"100%"}
            />
        </div>
    );
}

export default TopInfoMenu;
