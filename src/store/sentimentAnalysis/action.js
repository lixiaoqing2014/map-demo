import * as pollutionMonitor from "./action-type";
export const changeToDetail = (value) => {
  return {
    type: pollutionMonitor.CHANGETODETAIL,
    value,
  };
};

export const backToMap = () => {
  return {
    type: pollutionMonitor.BACKTOMAP
  };
};

export const changeDropDownSelect = (id, value) => {
  return {
    type: pollutionMonitor.CHANGEDROPDOWNSELECT,
    id,
    value
  };
};

