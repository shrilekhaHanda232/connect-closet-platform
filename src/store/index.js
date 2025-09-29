import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./features/contentSlice";

export default configureStore({
  reducer: {
    content: contentReducer,
  },
});
