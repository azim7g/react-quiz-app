import React, { Component } from 'react';
import Loader from "../../components/UI/Loader/Loader";
import { NavLink } from "react-router-dom";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions/quiz";
import classes from './QuizList.module.css';

class QuizList extends Component {
    renderQuizzes() {
        // в этом методе я обращаюсь к массиву всех викторин, которые имееются в приложении и отрисовываю ссылки
        // Массив этот будет приходить с бэкенда
        return this.props.quizzes.map((quiz) => (
            <li key={quiz.id}>
                <NavLink to={'/quiz/' + quiz.id}>
                    { quiz.name }
                </NavLink>
            </li>
        ))
    }

    componentDidMount() {
        this.props.fetchQuizzes();
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    {this.props.loading
                        ? <Loader/>
                        : <ul>
                            { this.renderQuizzes() }
                          </ul>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    quizzes: state.quiz.quizzes,
    loading: state.quiz.loading,
});

export default connect(mapStateToProps, actionCreators)(QuizList)