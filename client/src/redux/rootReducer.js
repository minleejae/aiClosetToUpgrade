import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import images from "./images/reducer";
import width from "./width/reducer";

const rootReducer = combineReducers({
  images,
  width,
});

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  //whitelist에 있는 reducer만 localstorage에 저장합니다.
  whitelist: ["images"],
  // blacklist -> 그것만 제외합니다
};

export default persistReducer(persistConfig, rootReducer);
