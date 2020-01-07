import { AnyAction } from "redux";

const initialState = {
  authenticated: false,
  userId: ""
};

export function userReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return {
        // ...state,
        authenticated: true,
        userId: action.payload
      };

    default:
      return state;
  }
}
