import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  selectedCategory: string;
  difficulty: string;
  amount: number;
  showScoreModal: boolean;
}

const initialState: UIState = {
  selectedCategory: "",
  difficulty: "easy",
  amount: 5,
  showScoreModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setDifficulty(state, action: PayloadAction<string>) {
      state.difficulty = action.payload;
    },
    setAmount(state, action: PayloadAction<number>) {
      state.amount = action.payload;
    },
    setShowScoreModal(state, action: PayloadAction<boolean>) {
      state.showScoreModal = action.payload;
    },
  },
});

export const {
  setSelectedCategory,
  setDifficulty,
  setAmount,
  setShowScoreModal,
} = uiSlice.actions;

export default uiSlice.reducer;
