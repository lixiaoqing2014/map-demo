import * as sentimentAnalysis from "./action-type";
let defaultState = {
  showEnterpriseDetail: false,
  enterpriseDetailName: "",
  dropDownSelectedType: {
    	pollutionLetTotal: "烟尘",
    	airRank: "烟尘",
    	waterRank: "COD",
    	waterFactoryRank: "COD",
  },
}

export const sentimentAnalysisData = (state = defaultState, action = {}) => {
  switch(action.type) {
  case sentimentAnalysis.CHANGETODETAIL: 
		    return {...state, ...{enterpriseDetailName: action.value, showEnterpriseDetail: true}};
  case sentimentAnalysis.BACKTOMAP:
		    return {...state, ...{showEnterpriseDetail: false}};
  case sentimentAnalysis.CHANGEDROPDOWNSELECT: {
		    let dropDownSelectedType = state.dropDownSelectedType;
		    dropDownSelectedType[action.id] = action.value;
    return {...state, ...{dropDownSelectedType: dropDownSelectedType}};
  }
  default:
		    return state;
  }
}
