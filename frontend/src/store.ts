import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import lobbyReducer from "./slices/lobbySlice";
import liberalBoardReducer from "./slices/liberalBoardSlice";
import fascistBoardReducer from "./slices/fascistBoardSlice";
import notificationReducer from "./slices/notificationSlice";
import voteReducer from "./slices/voteSlice";
import deckReducer from "./slices/deckSlice";
import { axiosMiddleware } from "./api/middleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    lobby: lobbyReducer,
    liberalBoard: liberalBoardReducer,
    fascistBoard: fascistBoardReducer,
    notification: notificationReducer,
    vote: voteReducer,
    deck: deckReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(axiosMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
