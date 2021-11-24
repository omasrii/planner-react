import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import application from './reducers/application'

const rootReducer = combineReducers({ application })

const middlewares = [thunk]

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`)

  middlewares.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middlewares))
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {application: ApplicationState}
export type AppDispatch = typeof store.dispatch
