import { useDispatch } from "react-redux";
interface config {
  type: string;
  payload: Object;
}

export interface dispatchType {
  (config: config): void;
}
// const dispatch =

// export { dispatch };
export { store } from "./store";
