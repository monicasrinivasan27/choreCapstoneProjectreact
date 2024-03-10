import React, { useState, useEffect } from 'react';
import KidNavbar from './KidNavbar';
import { getChildUserNameFromAuthToken } from '../axios_helper';
import  Kid from './kid/KidChores';

const KidDashboard = () => {

    const userName = getChildUserNameFromAuthToken();
    
        return (
            <div className='body'>
                <KidNavbar userName={userName}/>
                <div className='jumbotron jumbotron'>
                    <div className='container'>
                        <h1 className='display-4'>Welcome</h1>
                        <p className='lead'>Let's earn some rewards!</p>
                        <Kid userName={userName}></Kid>
                    </div>
                </div>             
            </div>
        )
    }
 export default KidDashboard;