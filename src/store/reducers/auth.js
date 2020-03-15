import {AUTH_INPUT_CHANGE, AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";
import {createControl, isValid, validate} from "../../formControllers/formControllers";

const initialState = {
    token: null,
    isFormValid: false,
    formControls: {
        email: createControl({
            type: 'email',
            label: 'Email',
            errorMessage: 'Введите корректный email',
        }, { required: true, email: true }),
        password: createControl({
            type: 'password',
            label: 'Пароль',
            errorMessage: 'Введите корректный пароль',
        }, { required: true, minLength: 6 })
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_INPUT_CHANGE:
            const { controlName, value } = action.payload;
            const formControls = { ...state.formControls };
            const control = formControls[controlName];
            control.value = value;
            control.touched = true;
            control.valid = validate(control.value, control.validation);
            formControls[controlName] = control;
            return { ...state, formControls, isFormValid: isValid(formControls) };
        case AUTH_SUCCESS: return {
            ...state, token: action.payload.token
        };
        case AUTH_LOGOUT: return { ...state, token: null };
        default: return state;
    }
}

