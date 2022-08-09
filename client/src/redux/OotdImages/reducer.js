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
        items: [...state.items],
        loading: true,
      };
    case FETCH_IMAGES_SUCCESS:
      console.log(state.items);
      return {
        ...state,
        items: [...state.items, ...action.payload.posts],
        loading: false,
      };
    case FETCH_IMAGES_FAILURE:
      return {
        ...state,
        items: [...state.items],
        loading: false,
        err: action.payload,
      };
    default:
      return state;
  }
};

export default imagesReducer;
