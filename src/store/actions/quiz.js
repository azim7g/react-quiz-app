import axios from 'axios'
import routes from './../../routes'
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZZES_START,
    FETCH_QUIZZES_SUCCESS,
    QUIZ_FINISH,
    QUIZ_QUESTION_TOGGLE,
    QUIZ_RETRY,
    ANSWER_STATE_SET
} from "./actionTypes";

export const fetchQuizzes = () => async (dispatch) => {
    dispatch(fetchQuizzesStart());
    try {
        const response = await axios.get(routes.quizzes());
        const quizzes = Object.keys(response.data).map((key, index) => ({
            id: key,
            name: `Тест №${index + 1}` // в перспективе пользователю можно будет давать возможность называть тест самостоятельно
        }));
        dispatch(fetchQuizzesSuccess(quizzes))
    } catch (e) {
        dispatch(fetchQuizzesError(e))
    }
};

export const fetchQuizById = (quizId) => async (dispatch) => {
    dispatch(fetchQuizzesStart());
    try {
        const response = await axios.get(routes.quiz(quizId));
        const quiz = response.data;
        dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
        dispatch(fetchQuizzesError(e))
    }
};

export const fetchQuizSuccess = (quiz) => ({ type: FETCH_QUIZ_SUCCESS, payload: { quiz } });

export const fetchQuizzesStart = () => ({
    type: FETCH_QUIZZES_START,
}); // начали что то загружать

export const fetchQuizzesSuccess = (quizzes) => ({
    type: FETCH_QUIZZES_SUCCESS,
    payload: { quizzes },
});

export const fetchQuizzesError = (e) => ({
    type: FETCH_QUIZZES_ERROR,
    payload: { error: e }
});


export const quizAnswerClick = (answerId) => (dispatch, getState) => {
    const state = getState().quiz;
    const { quiz, activeQuestion, results, answerState } = state;

    if (answerState) {
        const key = Object.keys(answerState)[0];
        if (answerState[key] === 'success') return;
        // это условие блокирует случай когда на ответ кликают больше одного раза еще до того как вопрос сменился
    }

    const question = quiz[activeQuestion];
    if (question.rightAnswerId === answerId) {

        if (!results[question.id]) {
            results[question.id] = 'success';
        }
        dispatch(answerSetState({ [answerId]: 'success' }, results));
        continueQuiz(state, dispatch);

    } else {
        results[question.id] = 'error';
        dispatch(answerSetState({ [answerId]: 'error', }, results));
        continueQuiz(state, dispatch);
    }
};

export const answerSetState = (answerState, results) => ({ type: ANSWER_STATE_SET, payload: { answerState, results, } });

export const finishQuiz = () => ({ type: QUIZ_FINISH });

export const quizNextQuestion = (number) => ({ type: QUIZ_QUESTION_TOGGLE, payload: { number } });

export const retry = () => ({ type: QUIZ_RETRY });

const continueQuiz = (state, dispatch) => {
    const isQuizFinished = state.activeQuestion + 1 === state.quiz.length;
    const timeout = setTimeout(() => {
        isQuizFinished
            ? dispatch(finishQuiz())
            : dispatch(quizNextQuestion(state.activeQuestion + 1))
        clearTimeout(timeout)
    }, 1000)
};