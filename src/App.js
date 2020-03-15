import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import Logout from "./components/Logout/Logout";
import * as actionCreators from "./store/actions/auth";

class App extends Component {
  componentDidMount() {
      this.props.autoLogin();
  }

  render() {
      const loggedUsersRoutes =
          <Switch>
              <Route path='/quiz-creator' component={QuizCreator}/>
              <Route path = '/quiz/:id' component={Quiz} />
              <Route path={'/logout'} component={Logout} />
              <Route path='/' component={QuizList} />
              <Redirect to={'/'} />
          </Switch>

      const unloggedUsersRoutes =
          <Switch>
              <Route path='/auth' component={Auth} />
              <Route path='/quiz/:id' component={Quiz} />
              <Route path='/' component={QuizList} />
              <Redirect to={'/'} />
          </Switch>

      return (
          <Layout>
              { this.props.isLogged ? loggedUsersRoutes : unloggedUsersRoutes }
          </Layout>
      );
  }

}

const mapStateToProps = (state) => ({ isLogged: state.auth.token });

export default withRouter(connect(mapStateToProps, actionCreators)(App));
