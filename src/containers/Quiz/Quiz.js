import React, { Component } from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import classes from './Quiz.module.css';
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions/quiz";

// данный компонент отвечает за определенную викторину

class Quiz extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchQuizById(id);
    }

    componentWillUnmount() {
        this.props.retry();
    }

    render() {
    const { quiz, activeQuestion, answerState, isFinished, results, loading, quizAnswerClick, retry } = this.props;

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на вопросы</h1>
            { loading || !quiz
                ? <Loader />
                : isFinished
                    ? <FinishedQuiz
                        results={results}
                        quiz={quiz}
                        onRetry={retry}
                    />
                    : <ActiveQuiz
                        answers={quiz[activeQuestion].answers}
                        question={quiz[activeQuestion].question}
                        onAnswerClick={quizAnswerClick}
                        quizLength={quiz.length}
                        questionNumber={activeQuestion + 1}
                        state={answerState}
                    />
            }
        </div>
      </div>
    );
    }
}

const mapStateToProps = (state) => ({
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    results: state.quiz.results,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
    isFinished: state.quiz.isFinished,
});


export default connect(mapStateToProps, actionCreators)(Quiz);