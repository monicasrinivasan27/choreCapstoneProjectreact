import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { request, setAuthToken } from '../axios_helper';
import'../styles/Register.css';

const KidRegister= () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        username: "",
        password: "",
        verifyPassword: "",
    })

    useEffect(() => {

        setFormData({
            firstName: "",
            username: "",
            password: "",
            verifyPassword: "",
        })
    },[])

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value}));
    };

    const onKidRegister = (e) => {
        e.preventDefault();
        request("POST", "/api/kidRegister", formData)
        .then((response) => {
            setAuthToken(response.data.token);
            setFormData({
                firstName: "",
                username: "",
                password: "",
                verifyPassword: "",
            });
            navigate('/api/parentDash')
        })
        .catch((error) => {
            console.error("Registration failed:", error);
        });
    };

    return(
        <div className='body'>
            <header className='header-body'>
                <a href='/' className='container'>
                    <img src={require('../images/TC-sm-logo.png')} alt='Small Task Crusher Logo' className='header-logo' />
                </a>
            </header>
            <div className='tab-pane fade show active' id='pills-register'>
                <form className='register-form' onSubmit={onKidRegister}>
                    <div className=''>
                        <div>
                            <div className='container'>
                                <h1 className='row justify-content-center display-4 welcome-message'>Child Registration</h1>
                                <p className='row justify-content-center lead message'>Please fill out the form below to create an account for your child</p>
                            </div>
                        </div>
                    </div>
                    <div className='form-outline mb-4'>
                        <input type='text input-lg' id='firstName' name='firstName' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='firstName'>First Name</label>
                    </div>

                    <div className='form-outline mb-4'>
                        <input type="text input-lg" id='username' name='username' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='username'>Username</label>
                    </div>

                    <div className='form-outline mb-4'>
                        <input type='password' id='password' name='password' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='password'>Password</label>
                    </div>

                    <div className='form-outline mb-4'>
                        <input type='password' id='verifyPassword' name='verifyPassword' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='verifyPassword'>Verify Password</label>
                    </div>
                    <div className='row justify-content-center d-grid gap-2 col-6 mx-auto'>
                        {/* <button className='btn btn-primary register-btn' type='submit'>Create Account</button> */}
                        <a class="btn btn-primary register-btn" href="Parent-dashboard" type="submit" role="submit" >Create Account</a>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default KidRegister