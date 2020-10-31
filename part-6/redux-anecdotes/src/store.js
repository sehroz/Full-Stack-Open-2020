import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notiReducer from './reducers/notiReducer'

const reducer = combineReducers({
  anecs: anecdoteReducer,
  noti: notiReducer,
})

const store = createStore(reducer, composeWithDevTools())

export default store
