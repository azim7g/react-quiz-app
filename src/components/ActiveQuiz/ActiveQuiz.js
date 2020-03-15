import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from "./AnswersList/AnswersList";
// этот компонент отвечает за активный вопрос

const ActiveQuiz = ({ questionNumber, quizLength, onAnswerClick, answers, question, state }) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{ questionNumber }.</strong>&nbsp;
          { question }
      </span>
      <small>{ questionNumber } из { quizLength }</small>
    </p>
    <AnswersList
        answers={answers}
        onAnswerClick={onAnswerClick}
        state={state}
    />
  </div>
);

export default ActiveQuiz;
