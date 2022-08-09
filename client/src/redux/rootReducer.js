import { combineReducers } from "redux";
import OotdImages from "./OotdImages/reducer";
import MarketImages from "./MarketImages/reducer";
import width from "./width/reducer";

const rootReducer = combineReducers({
  marketImages: MarketImages,
  ootdImages: OotdImages,
  width,
});

export default rootReducer;
