import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import uiReducer from "./uiReducer";
import mailReducer from "./mailReducer";

export default combineReducers({
  user: userReducer,
  form: formReducer,
  post: postReducer,
  ui: uiReducer,
  mail: mailReducer,
});
