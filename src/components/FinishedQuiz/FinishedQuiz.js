import React from 'react';
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import classes from './FinishedQuiz.module.css';

const FinishedQuiz = ({ quiz, results, onRetry }) => {
    const successAnswersCount = Object.keys(results).reduce((acc, id) => {
        return results[id] === 'success' ? acc + 1 : acc;
    }, 0);
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                { quiz.map((quizItem, index) => {
                    const answerState = results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check';
                    const cls = [
                      'fa',
                      answerState,
                      classes[results[quizItem.id]],
                    ];
                    return (
                        <li key={index}>
                            <strong>{ index + 1 }</strong>&nbsp;
                            { quizItem.question }
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                }) }
            </ul>
            <p>Правельно { successAnswersCount } из { quiz.length }</p>
            <div>
                <Button onClick={onRetry} type={'primary'}>Повторить</Button>
                <Link to="/">
                    <Button type={'success'}>Перейте к списку тестов</Button>
                </Link>
            </div>
        </div>
    )
};

export default FinishedQuiz;