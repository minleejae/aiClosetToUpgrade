import { combineReducers } from "redux";
import imagesReducer from "./images/reducer";
import widthReducer from "./width/reducer";

const rootReducer = combineReducers({
  images: imagesReducer,
  width: widthReducer,
});

export default rootReducer;
