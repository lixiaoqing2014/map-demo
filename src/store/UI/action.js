import * as UI from "./action-type";

export const changeRootFont = (value, height) => {
  return {
    type: UI.CHANGE_ROOT_FONT,
    value,
    height,
  };
};

