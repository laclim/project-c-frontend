import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { userReducer } from "./reducer";
import thunk, { ThunkMiddleware } from "redux-thunk";
// import { AppActions } from "./action";

const initialState = {};

const reducers = combineReducers({
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(thunk as ThunkMiddleware<AppState>),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f
  )
);

export { store };
