import {INPUT_CHANGE, QUESTION_ADD, QUIZ_CREATION_RESET, SELECT_CHANGE} from "./actionTypes";
import routes from './../../routes'
import axios from "axios";

export const createQuiz = () => async (dispatch, setState) => {
    const quiz = setState().create.quiz;
    await axios.post(routes.quizzes(), quiz);
    dispatch(resetQuizCreation());
};

const resetQuizCreation = () => ({ type: QUIZ_CREATION_RESET });

export const addQuestion = () => ({ type: QUESTION_ADD });

export const changeInput = (value, controlName) => ({ type: INPUT_CHANGE, payload: { value, controlName } });

export const changeSelect = (e) => ({ type: SELECT_CHANGE, payload: { rightAnswerId: +e.target.value } });