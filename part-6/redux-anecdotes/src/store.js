import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notiReducer from './reducers/notiReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecs: anecdoteReducer,
  noti: notiReducer,
  filter: filterReducer,
})

const store = createStore(reducer, composeWithDevTools())

export default store
