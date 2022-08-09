import { UPDATE_WIDTH } from "./types";

export const updateWidth = (width) => {
  return {
    type: UPDATE_WIDTH,
    payload: width,
  };
};
