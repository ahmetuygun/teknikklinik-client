import React, {Component} from 'react';
import './App.css';

import {Link, Route, Switch, withRouter} from 'react-router-dom';

import {getCurrentUser} from '../util/APIUtils';
import {ACCESS_TOKEN} from '../constants';
import NewRequestForm from '../NewRequest/NewRequestForm';
import Final from "../NewRequest/Final";

import 'semantic-ui-css/semantic.min.css';
import NewPoll from '../poll/NewPoll';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
import HomePageForm from '../HomePage/HomePageForm'

import {Layout, notification} from 'antd';
import {Menu} from "antd/lib/menu";

const {Content} = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
                this.props.history.push("/users/" + this.state.currentUser.email);

            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogout(redirectTo = "/", notificationType = "success", description = "Oturum başarıyla kapatıldı") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'teknikklinik.com',
            description: description,
        });
    }

    handleLogin() {
        notification.success({
            message: 'teknikklinik.com',
            description: "Başarıla giriş yaptınız.",
        });
        this.loadCurrentUser();

    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return (
            <Layout className="app-container">
                <AppHeader isAuthenticated={this.state.isAuthenticated}
                           currentUser={this.state.currentUser}
                           onLogout={this.handleLogout}/>

                <Content className="app-content">
                    <div className="container">
                        <Switch>


                            <Route exact path="/" render={() => {window.location.href="/main.html"}} />


                            <Route path="/login"
                                   render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                            <Route exact path='/newRequestForm/:id' component={NewRequestForm}></Route>
                            <Route exact path='/approve/' component={Final}></Route>

                            <Route path="/signup" component={Signup}></Route>
                            <Route path="/users/:email"
                                   render={(props) => <Profile isAuthenticated={this.state.isAuthenticated}
                                                               currentUser={this.state.currentUser} {...props}  />}>
                            </Route>

                            <Route component={NotFound}></Route>

                            <Route path="/signup" component={Signup}></Route>

                        </Switch>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(App);
