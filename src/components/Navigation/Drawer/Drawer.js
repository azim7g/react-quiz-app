import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from './Drawer.module.css';
import {connect} from "react-redux";
import {uniqueId} from 'lodash';

class Drawer extends Component {
    renderLinks(links) {
        return links.map(link => (
            <li key={uniqueId()}>
                <NavLink
                    to={link.to}
                    exact={link.exact}
                    activeClassName={classes.active}
                    onClick={this.props.onClose}
                >
                    {link.label}
                </NavLink>
            </li>
        ))
    }

    render() {
        const { isOpen, onClose, isLogged } = this.props;
        const menuState = isOpen ? null : classes.close;
        const cls = [classes.Drawer, menuState];
        const links = isLogged
            ? [
                { to: '/', label: 'Список', exact: true, },
                { to: '/quiz-creator', label: 'Создать тест', exact: false, },
                { to: '/logout', label: 'Выйти', exact: false, }
              ]
            : [
                { to: '/', label: 'Список', exact: true, },
                { to: '/auth', label: 'Авторизация', exact: false, },
              ];

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks(links) }
                    </ul>
                </nav>
                { isOpen ? <Backdrop onClick={onClose} /> : null }
            </>
        );
    }
}

const mapStateToProps = (state) => ({ isLogged: state.auth.token });

export default connect(mapStateToProps)(Drawer);
