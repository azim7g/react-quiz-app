import axios from 'axios';
import {AUTH_INPUT_CHANGE, AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";
import key from "../../apikey";

// стоит задача закрывать доступ к странице создания тестов будучи не авторизоваными
// мы будем поддерживать автологин если у нас есть что то в localStoridge() и т.д
// и так в ответе сервера, который придет после заполнении полей атвторизации нам нужно
//      1) idToken, который позволяет поддерживать сессию,
//      2) localId для определения пользователя
//      3) expiresIn чтобы опредилть когда именно будет заканчиваться сессия
/*                      * token - опознавательный знак
                        *  new Date() преобразует данные даты в дату, которую понимает js
*   для того чтобы поддерживать сессию в реакт приложениях нам нужен токен который пришел от сервера. Его
*   положить в local storage (локальное хранилище), для того чтобы мы имели к нему (к токену) доступ
*   делается это с помощью функции глобального объекта localStorage.setItem('token', idToken)
*   далее нужно занести локальный id пользователя localStorage.setItem('userId', localId)
*   так же нужно обработать expirationDate - обычно такие токены даются на 1 час, поэтому нам нужно проверять
*       если час прошел уже то нам нужно закончить сессию и получить новый токен, т.е заново авторизоваться
*       для этого можно обернуть все в конструктор new Date, далее получить текущее кол-во времени сессии (timeShtamp) и прибавить к
*        нему expiresIn и умножить на 1000 и теперь в константе у нас правельное время
*        и ее так же складываем в localStorage.setState('expirationDate', expirationDate) под ключом expirationDate
* */
export const autoLogin = () => (dispatch) => {
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    !token ? dispatch(logout()) : dispatch(authSuccess(token)) && dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
    //высчитаем остаток сессии
    // if (!token) dispatch(logout());
    // else {
    //     const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //     if (expirationDate <= new Date()) {
    //         dispatch(logout())
    //     } else {
    //         dispatch(authSuccess(token));// поддерживаем сессию
    //         dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
    //     }
    // }

}; // поддерживаем сессию если остались валидные данные в localStoridge

export const auth = (isLogin) => async (dispatch, useState) => {
    const { email, password } = useState().auth.formControls;
    const authData = { email: email.value, password: password.value, returnSecureToken: true };
    const registerUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + key;
    const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + key;
    const url = isLogin ? loginUrl : registerUrl;
    const response = await axios.post(url, authData);
    const { data } = response;
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(data.idToken));// поддерживаем сессию
    dispatch(autoLogout(data.expiresIn)); // через час сессия заканчивается, и поэтому здесь будем задавать тайм аут, н-р если проработаем час в нашей системе,
                                            // то в таком случае мы автоматически будем делать logout()
};

export const authSuccess = (token) => ({ type: AUTH_SUCCESS, payload: { token } });
// в состояние записывается токен, и так мы можем понять что пользователь автроризовался, теперь стоит задача сделать так чтобы приложение реагировало на данную авторизацию,
// а точнее если юзер не авторизован блокировать доступ к странице создания тестов. В ином случае делать автологин

export const autoLogout = (time) => (dispatch) => {
    setTimeout(() => {
        dispatch(logout())
    }, time * 1000)
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return { type: AUTH_LOGOUT }
};

export const changeAuthInput = (value, controlName) => ({ type: AUTH_INPUT_CHANGE, payload: { value, controlName } });
