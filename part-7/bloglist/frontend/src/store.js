import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notiReducer from './reducers/notiReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  noti: notiReducer,
  blogs: blogReducer,
  user: loginReducer,
  users: userReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
