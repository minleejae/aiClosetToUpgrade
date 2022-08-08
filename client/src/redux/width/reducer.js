import { UPDATE_WIDTH } from "./types";

const initialState = {
  width: 1000,
  columns: 5,
  perPages: 20,
};

const widthReducer = (state = initialState, action) => {
  //px 세밀한 조정 필요
  const newWidth = action.payload - 32;
  let newColumns = 5;
  let newPerPages = 20;
  if (newWidth < 1400 && newWidth > 900) {
    newColumns = 4;
    newPerPages = 16;
  } else if (newWidth > 1400) {
    newColumns = 5;
    newPerPages = 20;
  } else if (newWidth < 900) {
    newColumns = 3;
    newPerPages = 12;
  }

  switch (action.type) {
    case UPDATE_WIDTH:
      return {
        width: newWidth,
        columns: newColumns,
        perPages: newPerPages,
      };
    default:
      return state;
  }
};

export default widthReducer;
