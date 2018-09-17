import React, {Component} from "react";
import PetitionComplaint from "../petitionComplaint/petitionComplaint"
import PetitionHandling from "../petitionHandling/petitionHandling"
import PetitionTypes from "../petitionTypes/petitionTypes"
import PetitionArea from "../petitionArea/petitionArea"
import "./petitionMoudel.scss"
import RadarChart from "../radarChart/radarChart";
import PetitionCompany from "../petitionCompany/petitionCompany";

export default class petitionMoudel extends Component {

  render () {
    return (
      <div className="petition-container">
        <div className="left">
          <div className="left-first">
              1111111111111111
            <PetitionHandling />
          </div>
          <div className="left-second">
              2222222222222222
            <PetitionTypes />
          </div>
          <div>
              33333333333333
            <PetitionArea />
          </div>
        </div>
			  <div className="middle">
                  444444444444444444444
          <PetitionComplaint />
        </div>
        <div className="right">
            5555555555555555555555555555
          <RadarChart UIData={this.props.UIData} />
            6666666666666666666666666666
          <PetitionCompany UIData={this.props.UIData} />
        </div>
      </div>
    )
  }
}