import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface QuizQuestion {
  question: string;
  answers: string[];
}

interface QuizState {
  questions: QuizQuestion[];
  selectedAnswers: { [index: number]: string };
  correctAnswers: { [index: number]: string };
  score: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: QuizState = {
  questions: [],
  selectedAnswers: {},
  correctAnswers: {},
  score: null,
  status: "idle",
};

export const fetchQuiz = createAsyncThunk(
  "quiz/fetchQuiz",
  async (params: { category: string; difficulty: string; amount: number }) => {
    const res = await axios.get("http://localhost:5000/api/quiz", {
      params,
    });
    return res.data;
  }
);

export const submitQuiz = createAsyncThunk(
  "quiz/submitQuiz",
  async (payload: {
    questions: QuizQuestion[];
    answers: Record<number, string>;
  }) => {
    const formatted = Object.entries(payload.answers).map(
      ([index, answer]) => ({
        question: payload.questions[Number(index)].question,
        answer,
      })
    );

    const res = await axios.post("http://localhost:5000/api/quiz/score", {
      answers: formatted,
    });

    return res.data;
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    selectAnswer: (
      state,
      action: PayloadAction<{ index: number; answer: string }>
    ) => {
      state.selectedAnswers[action.payload.index] = action.payload.answer;
    },
    resetQuiz: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, (state) => {
        state.status = "loading";
        state.questions = [];
        state.selectedAnswers = {};
        state.score = null;
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchQuiz.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.score = action.payload.score;

        const answerMap: Record<number, string> = {};
        action.payload.correctAnswers.forEach((item: any, idx: number) => {
          answerMap[idx] = item.correct;
        });

        state.correctAnswers = answerMap;
      });
  },
});

export const { selectAnswer, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
