import * as React from 'react';
import WelcomeContent from './WelcomeContent';
import Header from './Header';
import AuthContent from './AuthContent';
import LoginForm from './LoginForm';
import Buttons from './Buttons';
import { request } from '../axios_helper'

export default class AppContent extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            componentToShow: "welcome"
        };
    }

    login = () => {
        this.setState({componentToShow: "login"});
    }

    logout = () => {
        this.setState({componentToShow: "welcome"});
    }

    onLogin = (e, username, password) => {
        debugger;
        e.preventDefault();
        request("POST",
        "/api/parent-login",
        { login: username, password: password}
        ) .then((response) => {
            this.setState({componentToShow: "messages"})
        }).catch((error) => {
            this.setState({componentToShow: "welcome"})
        })
    }

    onRegister = (e, firstName, lastName, username, password) => {
        e.preventDefault();
        request("POST",
        "/register",
        { 
            firstName: firstName,
            lastName: lastName,
            login: username,
            password: password
        }
        ) .then((response) => {
            this.setState({componentToShow: "messages"})
        }).catch((error) => {
            this.setState({componentToShow: "welcome"})
        })
    }

    render() {
        return(
            <div>
                <Header />
                <Buttons login={this.login} logout={this.logout}
                />
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col'>
                            {this.state.componentToShow === "welcome" && <WelcomeContent />}
                            {this.state.componentToShow === "messages" && <AuthContent />}
                            {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister}/>}
                        </div>
                    </div>   
                </div>
            </div>
        )
    }

}