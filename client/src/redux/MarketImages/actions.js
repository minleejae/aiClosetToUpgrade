import {
  FETCH_IMAGES,
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from "./types";

import port from "../../data/port.json";

export const fetchMarketImages = (
  page,
  perPage,
  accessToken,
  searchType,
  searchValue
) => {
  return (dispatch) => {
    dispatch(fetchImagesRequest(searchValue));

    console.log("actions page!", searchValue, page);
    let fetchUrl = `${port.url}/api/market/list?page=${page}&perPage=${perPage}`;
    if (searchValue) {
      fetchUrl = `${port.url}/api/search/?postType=3&option=${searchType}&content=${searchValue}&page=${page}&perPage=${perPage}`;
    }

    fetch(fetchUrl, {
      headers: {
        accessToken,
      },
    })
      .then((response) => response.json())
      .then((images) => {
        console.log("imgaes", images);
        dispatch(fetchImagesSuccess(images));
      })
      .catch((error) => {
        console.log("action err", error);
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

const fetchImagesRequest = (searchValue) => {
  if (searchValue) {
    return {
      type: FETCH_IMAGES_REQUEST,
      payload: searchValue,
    };
  } else {
    return {
      type: FETCH_IMAGES_REQUEST,
    };
  }
};
