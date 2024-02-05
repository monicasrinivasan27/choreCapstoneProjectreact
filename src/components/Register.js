import * as React from 'react';
import '../styles/Register.css';
import parentLogin from './parentLogin';
import classNames from 'classnames';
import { request, setAuthToken } from '../axios_helper';
import AuthContent from './AuthContent';

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: "register",
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            verifyPassword: "",
            onRegister: props.onRegister,
        }
    }

    /* This method: store in the state the updated values of the fields */
    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    }

    onRegister = (e, firstName, lastName, email, username, password, verifyPassword) => {
        e.preventDefault();
        request("POST",
            "/api/register",
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: password,
                verifyPassword: verifyPassword
            }
        ).then((response) => {
            this.setState({ componentToShow: "parentLogin" })
            setAuthToken(response.data.token)
        }).catch((error) => {
            this.setState({ componentToShow: "register" })
        })
    }

    onSumbitRegister = (e) => {
        this.state.onRegister(
            e,
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.username,
            this.state.password,
            this.state.verifyPassword
        )
    }

    render() {
        return (
            <div className='body'>
                <header className='header-body'>
                    <a href='/' className='container'>
                        <img src={require('../images/TC-sm-logo.png')} alt='Small Task Crusher Logo' className='header-logo' />
                    </a>
                </header>
                <div className={classNames("tab-pane", "fade", this.state.active === 'register' ? 'show active' : '')} id='pills-register'>
                    <form className='register-form' onSubmit={this.onSubmitRegister}>
                        <div className=''>
                            <div className='jumbotron jumbotron'>
                                <div className='container'>
                                    <h1 className='row justify-content-center display-4 welcome-message'>Welcome</h1>
                                    <p className='row justify-content-center lead message'>Create an account with us!</p>
                                </div>
                            </div>
                        </div>
                        <div className='form-outline mb-4'>
                            <input type='text input-lg' id='firstName' name='firstName' className='form-control' onChange={this.onChangeHandler} />
                            <label className='form-label' htmlFor='firstName'>First Name</label>
                        </div>

                        <div className='form-outline mb-4'>
                            <input type='text input-lg' id='lastName' name='lastName' className='form-control' onChange={this.onChangeHandler} />
                            <label className='form-label' htmlFor='lastName'>Last Name</label>
                        </div>

                        <div className='form-outline mb-4'>
                            <input type='email' id='email' name='email' className='form-control' onChange={this.onChangeHandler} />
                            <label className='form-label' htmlFor='email'>Email</label>
                        </div>

                        <div className='form-outline mb-4'>
                            <input type="text input-lg" id='username' name='username' className='form-control' onChange={this.onChangeHandler} />
                            <label className='form-label' htmlFor='username'>Username</label>
                        </div>

                        <div className='form-outline mb-4'>
                            <input type='password' id='password' name='password' className='form-control' onChange={this.onChangeHandler} />
                            <label className='form-label' htmlFor='password'>Password</label>
                        </div>

                        <div className='form-outline mb-4'>
                            <input type='password' id='verifyPassword' name='verifyPassword' className='form-control' onChange={this.onChangeHandler} />
                            <label className='form-label' htmlFor='verifyPassword'>Verify Password</label>
                        </div>
                        <div>
                            <a href='./parentLogin' className='row justify-content-center'>
                                <button className='btn btn-primary register-btn' type='submit'>Sign In</button>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
