import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { tasksReducer } from "./tasks/reducer";

const coposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const rootReducer = combineReducers({
  tasks :tasksReducer
});


//store to store the data.
export const store = createStore(
  rootReducer,
  coposeEnhancers(applyMiddleware(thunk))
);
