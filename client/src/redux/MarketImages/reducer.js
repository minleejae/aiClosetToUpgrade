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
  hasMore: true,
  search: "",
};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES_REQUEST:
      console.log("request:", state, action);
      if (state.search === action.payload) {
        return {
          ...state,
          items: [...state.items],
          loading: true,
        };
      } else {
        return {
          ...state,
          items: [],
          search: action.payload,
          hasMore: true,
          loading: true,
        };
      }
    case FETCH_IMAGES_SUCCESS:
      console.log("success: action.payload:", action.payload, "state", state);
      if (action.payload.posts.length > 0) {
        return {
          ...state,
          items: [...state.items, ...action.payload.posts],
          loading: false,
        };
      } else {
        return {
          ...state,
          items: [...state.items, ...action.payload.posts],
          loading: false,
          hasMore: false,
        };
      }
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
