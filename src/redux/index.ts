import { useDispatch } from "react-redux";
interface config {
  type: string;
  payload?: Object;
}

export interface dispatchType {
  (config: config): void;
}

export { store } from "./store";
