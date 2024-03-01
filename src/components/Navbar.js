import * as React from 'react';

import '../styles/Navbar.css'
import { Link } from 'react-router-dom';
import Logout from './Logout';

import { useNavigate } from 'react-router';

export default function Navbar() {


    return (
        <header className='header-body'>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <img src={require('../images/TC-sm-logo.png')} alt='Small Task Crusher Logo' className='header-logo' />
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/api/parentDash">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/api/kidRegister">Add Child</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/api/chores/add">Create Chore</a>

                          </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/api/chores/list">Chores List</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/api/assignments/assigned-chores/:id">Assigned Chores</a>
                            </li>
                            
                            <li class="nav-item">
                            {/* <span className="nav-link active" aria-current="page" onClick={handleLogout} >Logout</span> */}
                            <Logout/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

