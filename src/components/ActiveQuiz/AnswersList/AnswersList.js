import React from 'react';
import classes from './AnswersList.module.css';
import AnswerItem from "./AnswerItem/AnswerItem";
// этот компонент отвечет за отрисовку возможных вариантов ответа

const AnswersList = ({ answers, onAnswerClick, state }) => (
  <ul className={classes.AnswersList}>
      { answers.map((answer, index) => {
        return (
            <AnswerItem
                answer={answer}
                key={index}
                onAnswerClick={onAnswerClick}
                state={state ? state[answer.id] : null}
            />
        )
      }) }
  </ul>
)

export default AnswersList;
