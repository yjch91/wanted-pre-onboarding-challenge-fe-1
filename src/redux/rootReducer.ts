import { combineReducers } from "redux";
import todoConfirmReducer from "./reducer/todoConfirm";
import todoErrorReducer from "./reducer/error";

const rootReducer = combineReducers({
  todoErrorReducer,
  todoConfirmReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;


