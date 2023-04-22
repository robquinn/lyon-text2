import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './slices/messages';
import searchReducer from './slices/search';
import sheetReducer from './slices/sheet';
import smsReducer from './slices/sms';
import snackbarReducer from './slices/snackbar';

export const store = configureStore({
  reducer: {
    sms: smsReducer,
    sheet: sheetReducer,
    snackbar: snackbarReducer,
    messages: messagesReducer,
    search: searchReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
