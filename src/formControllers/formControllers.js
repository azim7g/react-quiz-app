import is from "is_js";

export const createControl = (config, validation) => ({
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: '',
});

export const createOptionControl = (number) => createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number,
    }, { required: true });

export const createFormControls = () => ({
    question: createControl({
        label: 'Введите вопрос',
        errorMessage: 'Заполните поле вопроса'
    }, { required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
});


export const isValid = (formControls) => {
    const isFormValid = Object.keys(formControls).reduce((acc, name) => acc ? formControls[name].valid : false, true);
    return isFormValid;
};

export const validate = (value, validation = null) => {
    if (!validation) return true;
    let isValid = true;

    if (validation.required) isValid = value.trim() !== '' && isValid;
    if (validation.email) isValid = is.email(value) && isValid;
    if (validation.minLength) isValid = value.length >= validation.minLength && isValid;

    return isValid;
};