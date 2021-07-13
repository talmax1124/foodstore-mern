import axios from 'axios'
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  REMOVE_IMAGE_FAIL,
  REMOVE_IMAGE_REQUEST,
  REMOVE_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from '../constants/productConstants'

export const uploadFile = (file) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post('/api/upload', { image: file }, config)

    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeFile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_IMAGE_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.post('/api/remove', { id }, config)
    dispatch({ type: REMOVE_IMAGE_SUCCESS })
  } catch (error) {
    dispatch({
      type: REMOVE_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST })
    const {
      userLogIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.post('/api/product', product, config)
    dispatch({ type: CREATE_PRODUCT_SUCCESS })
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
