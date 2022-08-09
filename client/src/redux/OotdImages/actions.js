import {
  FETCH_IMAGES,
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from "./types";

import port from "../../data/port.json";

export const fetchOotdImages = (page, perPage) => {
  return (dispatch) => {
    dispatch(fetchImagesRequest());
    fetch(`${port.url}/api/posts/list?page=${page}&perPage=${perPage}`)
      .then((response) => response.json())
      .then((images) => {
        dispatch(fetchImagesSuccess(images));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchImagesFailure(error));
      });

    console.log("abcd");
  };
};

const fetchImagesSuccess = (images) => {
  return {
    type: FETCH_IMAGES_SUCCESS,
    payload: images,
  };
};

const fetchImagesFailure = (error) => {
  return {
    type: FETCH_IMAGES_FAILURE,
    payload: error,
  };
};

const fetchImagesRequest = () => {
  return {
    type: FETCH_IMAGES_REQUEST,
  };
};
