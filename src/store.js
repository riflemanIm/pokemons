import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import * as reducers from "./reducers/pokemon_reducer";

const combinedReducers = combineReducers(reducers);
const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
