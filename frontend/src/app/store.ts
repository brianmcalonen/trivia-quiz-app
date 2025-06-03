import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categories/categorySlice";
import quizReducer from "../features/quiz/quizSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    quiz: quizReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
