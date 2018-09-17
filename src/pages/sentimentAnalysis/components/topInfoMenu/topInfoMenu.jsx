import React from "react";
import "./topInfoMenu.scss";

import DetailList from "./components/detailList/detailList";
import OverView from "./components/overView/overView";
import TabListCommon from "components/tabListCommon/tabListCommon";
import iconNewsActive from "image/news_active@1x.png";
import iconNews from "image/news@1x.png";
import iconPetition from "image/petition@1x.png";
import iconPetitionActive from "image/petition_active@1x.png";

const TAB_LIST_ITEM = [
  {title: "信访", activeIcon: iconPetitionActive, icon: iconPetition},
  {title: "新闻", activeIcon: iconNewsActive, icon: iconNews},
];

function TopInfoMenu (props) {

  return (
    <div className="sentiment-top">
      <TabListCommon activeModuleIndex={props.activeModuleIndex}
        tabListItem={TAB_LIST_ITEM}
        onClick={props.changeTabClick}
        width={"12%"}
      />
      <DetailList />
      <OverView data={props.overView} />
    </div>
  );
}

export default TopInfoMenu;
