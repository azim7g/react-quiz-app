import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions/auth";

class Auth extends Component {
    renderInputs() {
        const { formControls, changeAuthInput } = this.props;
        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={true}
                    errorMessage={control.errorMessage}
                    onChange={(e) => changeAuthInput(e.target.value, controlName)}
                />
            )
        });
    }

    render() {
        const { isFormValid, auth } = this.props;
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={e => e.preventDefault()} className={classes.AuthForm}>

                        { this.renderInputs() }
                        <Button
                            type="success"
                            onClick={() => auth(true)}
                            disabled={!isFormValid}
                        >
                            Войти
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => auth(false)}
                            disabled={!isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isFormValid: state.auth.isFormValid,
    formControls: state.auth.formControls,
});

export default connect(mapStateToProps, actionCreators)(Auth);
