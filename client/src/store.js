import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  addonCreateReducer,
  addonDeleteReducer,
  addonDetailsReducer,
  addonListReducer,
  addonUpdateReducer,
} from './reducers/addonReducers'
import {
  attributeCreateReducer,
  attributeDeleteReducer,
  attributeDetailsReducer,
  attributeListReducer,
  attributeUpdateReducer,
} from './reducers/attributeReducers'
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from './reducers/categoryReducers'
import {
  fileRemoveReducer,
  fileUploadReducer,
  productCountReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListAdminReducer,
  productListReducer,
  productUpdateReducer,
} from './reducers/productReducers'
import { userListReducer, userLogInReducer } from './reducers/userReducers'
import {
  variableCreateReducer,
  variableDeleteReducer,
  variableDetailsReducer,
  variableListReducer,
  variableUpdateReducer,
} from './reducers/variableReducers'

const reducer = combineReducers({
  userLogIn: userLogInReducer,
  userList: userListReducer,
  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categoryDelete: categoryDeleteReducer,
  categoryDetails: categoryDetailsReducer,
  categoryUpdate: categoryUpdateReducer,
  addonCreate: addonCreateReducer,
  addonList: addonListReducer,
  addonDelete: addonDeleteReducer,
  addonDetails: addonDetailsReducer,
  addonUpdate: addonUpdateReducer,
  fileUpload: fileUploadReducer,
  fileRemove: fileRemoveReducer,
  productCreate: productCreateReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productDetails: productDetailsReducer,
  attributeCreate: attributeCreateReducer,
  attributeList: attributeListReducer,
  attributeDelete: attributeDeleteReducer,
  attributeDetails: attributeDetailsReducer,
  attributeUpdate: attributeUpdateReducer,
  variableCreate: variableCreateReducer,
  variableList: variableListReducer,
  variableDelete: variableDeleteReducer,
  variableDetails: variableDetailsReducer,
  variableUpdate: variableUpdateReducer,
  productCount: productCountReducer,
  productListAdmin: productListAdminReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

//initialStates
const initialState = {
  userLogIn: { userInfo: userInfoFromStorage },
}

//Middleware
const middleware = [thunk]

//Store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
