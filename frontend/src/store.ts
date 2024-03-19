import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import lobbyReducer from "./slices/lobbySlice";
import liberalBoardReducer from "./slices/liberalBoardSlice";
import facistBoardReducer from "./slices/facistBoardSlice";
import notificationReducer from "./slices/notificationSlice";
import { axiosMiddleware } from "./api/middleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    lobby: lobbyReducer,
    liberalBoard: liberalBoardReducer,
    facistBoard: facistBoardReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(axiosMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;