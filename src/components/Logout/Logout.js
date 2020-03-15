// компонент, отвечающий за выход из системы
// все сводится к тому что компонент будет в виде обычной ссылки, с помощью которой можно будет выходить из системы
// как только компонент инициализируется нам нужно разлогинится
import React, { Component } from 'react';
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions/auth";
import {Redirect} from "react-router-dom";

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <Redirect to={'/'} />
        )
    }
}

export default connect(null, actionCreators)(Logout)