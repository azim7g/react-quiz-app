import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZZES_START,
    FETCH_QUIZZES_SUCCESS, QUIZ_FINISH, QUIZ_QUESTION_TOGGLE, QUIZ_RETRY, ANSWER_STATE_SET
} from "../actions/actionTypes";

const iniialState = {
    quizzes: [],
    loading: false,
    error: null,
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    results: {},
    quiz: null,
};

const quizReducer = (state = iniialState, action) => {
  switch (action.type) {
      case FETCH_QUIZZES_START:
          return {
              ...state, loading: true
          };
      case FETCH_QUIZZES_SUCCESS:
          return {
              ...state, loading: false, quizzes: action.payload.quizzes
          };
      case FETCH_QUIZZES_ERROR:
          return {
              ...state, loading: false, error: action.payload.error
          };
      case FETCH_QUIZ_SUCCESS:
          return {
              ...state, loading: false, quiz: action.payload.quiz
          };
      case ANSWER_STATE_SET: return {
          ...state, answerState: action.payload.answerState, results: action.payload.results
      };
      case QUIZ_FINISH: return { ...state, isFinished: true };
      case QUIZ_QUESTION_TOGGLE: return {
          ...state,
          activeQuestion: action.payload.number,
          answerState: null,
      };
      case QUIZ_RETRY: return {
          ...state,
          activeQuestion: 0,
          isFinished: false,
          results: {},
          answerState: null,
      };
      default: return state;
  }
};

export default quizReducer;