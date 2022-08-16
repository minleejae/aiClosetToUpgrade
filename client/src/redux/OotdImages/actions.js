import {
  FETCH_IMAGES,
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from "./types";

import port from "../../data/port.json";

export const fetchOotdImages = (
  page,
  perPage,
  accessToken,
  searchType,
  searchValue
) => {
  return (dispatch) => {
    dispatch(fetchImagesRequest(searchValue));

    let fetchUrl = `${port.url}/api/posts/list?page=${page}&perPage=${perPage}`;
    if (searchValue) {
      fetchUrl = `${port.url}/api/search/?postType=2&option=${searchType}&content=${searchValue}&page=${page}&perPage=${perPage}`;
    }

    fetch(fetchUrl, {
      headers: {
        accessToken,
      },
    })
      .then((response) => response.json())
      .then((images) => {
        dispatch(fetchImagesSuccess(images));
      })
      .catch((error) => {
        console.log(error);
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
