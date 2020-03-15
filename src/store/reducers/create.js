import {INPUT_CHANGE, QUESTION_ADD, QUIZ_CREATION_RESET, SELECT_CHANGE} from "../actions/actionTypes";
import {createFormControls, isValid, validate} from "../../formControllers/formControllers";
import {uniqueId} from "lodash";

const initialState = {
    quiz: [],
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls(),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            const { controlName, value } = action.payload;
            const formControls = { ...state.formControls };
            const control = formControls[controlName];
            control.value = value;
            control.touched = true;
            control.valid = validate(control.value, control.validation);
            formControls[controlName] = control;
            return { ...state, formControls, isFormValid: isValid(formControls) };
        case SELECT_CHANGE: return { ...state, rightAnswerId: action.payload.rightAnswerId }
        case QUESTION_ADD:
            const { question, option1, option2, option3, option4 } = state.formControls;
            const quizItem = {
                question: question.value,
                id: uniqueId(),
                rightAnswerId: state.rightAnswerId,
                answers: [
                    { text: option1.value, id: option1.id },
                    { text: option2.value, id: option2.id },
                    { text: option3.value, id: option3.id },
                    { text: option4.value, id: option4.id },
                ],
            };
            return {
                quiz: [...state.quiz, quizItem],
                rightAnswerId: 1,
                isFormValid: false,
                formControls: createFormControls(),
            };
        case QUIZ_CREATION_RESET: return {
            quiz: [],
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls(),
        };
        default: return state;
    }
}