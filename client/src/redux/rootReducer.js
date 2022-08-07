import { combineReducers } from "redux";
import imagesReducer from "./images/reducer";

const rootReducer = combineReducers({
  images: imagesReducer,
});

export default rootReducer;
