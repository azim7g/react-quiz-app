import React, { Component } from 'react';
import Select from "../../components/UI/Select/Select";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import classes from './QuizCreator.module.css';
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions/create";

class QuizCreator extends Component {
    renderInputs() {
        const { formControls, changeInput } = this.props;
        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName];
            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        touched={control.touched}
                        valid={control.valid}
                        shouldValidate={true}
                        errorMessage={control.errorMessage}
                        onChange={(e) => changeInput(e.target.value, controlName)}
                    />
                    { index === 0 ? <hr/> : null }
                </Auxiliary>
            )
        })
    }

    render() {
        const { rightAnswerId, quiz, isFormValid, changeSelect, addQuestion, createQuiz } = this.props;
        const select = <Select
            label='Выберите правельный ответ'
            value={rightAnswerId}
            onChange={changeSelect}
            options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
            ]}
        />;
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание тестов</h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        { this.renderInputs() }
                        { select }
                        <Button
                            type="primary"
                            onClick={addQuestion}
                            disabled={!isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type="success"
                            onClick={createQuiz}
                            disabled={quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    quiz: state.create.quiz,
    rightAnswerId: state.create.rightAnswerId,
    isFormValid: state.create.isFormValid,
    formControls: state.create.formControls,
});

export default connect(mapStateToProps, actionCreators)(QuizCreator);
