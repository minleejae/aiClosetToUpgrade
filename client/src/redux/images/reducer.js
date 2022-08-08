import {
  FETCH_IMAGES,
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from "./types";

const initialState = {
  items: [],
  loading: false,
  err: null,
};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_IMAGES_SUCCESS:
      console.log("action payload", ...action.payload.posts);
      console.log(state.items);
      return {
        ...state,
        items: [...state.items, ...action.payload.posts],
        loading: false,
      };
    case FETCH_IMAGES_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default imagesReducer;
