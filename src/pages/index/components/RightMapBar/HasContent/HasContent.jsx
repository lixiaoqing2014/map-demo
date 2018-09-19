import React from "react";
import "./HasContent.scss";
import ListContent from "./ListContent/ListContent"
import Weather from "./Weather/Weather";
import DataShow from "./DataShow/DataShow"
import PetitionHandling from "./PetitionHandling/PetitionHandling"
function HasContent (props) {

    return (
        <div className="sentiment-top">
            <div>
                <Weather />
                <PetitionHandling />
            </div>

            <DataShow />
            <ListContent />
        </div>
    );
}

export default HasContent;
