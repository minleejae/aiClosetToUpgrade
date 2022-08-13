import {
  FETCH_IMAGES,
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from "./types";

import port from "../../data/port.json";

export const fetchMarketImages = (page, perPage, accessToken) => {
  return (dispatch) => {
    dispatch(fetchImagesRequest());
    fetch(`${port.url}/api/market/list?page=${page}&perPage=${perPage}`, {
      headers: {
        accessToken,
      },
    })
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
