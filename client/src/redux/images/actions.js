import {
  FETCH_IMAGES,
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from "./types";

export const fetchImages = () => {
  return (dispatch) => {
    dispatch(fetchImagesRequest());
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((images) => {
        dispatch(fetchImagesSuccess(images));
      })
      .catch((error) => {
        dispatch(fetchImagesFailure(error));
      });
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
