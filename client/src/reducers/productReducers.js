import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  REMOVE_IMAGE_FAIL,
  REMOVE_IMAGE_REQUEST,
  REMOVE_IMAGE_RESET,
  REMOVE_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_RESET,
  UPLOAD_IMAGE_SUCCESS,
} from '../constants/productConstants'

export const fileUploadReducer = (state = { uploadData: {} }, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true }
    case UPLOAD_IMAGE_SUCCESS:
      return { loading: false, success: true, uploadData: action.payload }
    case UPLOAD_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    case UPLOAD_IMAGE_RESET:
      return { uploadData: {} }
    default:
      return state
  }
}

export const fileRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_IMAGE_REQUEST:
      return { loading: true }
    case REMOVE_IMAGE_SUCCESS:
      return { loading: false, success: true }
    case REMOVE_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    case REMOVE_IMAGE_RESET:
      return {}
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true }
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_PRODUCT_RESET:
      return {}
    default:
      return state
  }
}
