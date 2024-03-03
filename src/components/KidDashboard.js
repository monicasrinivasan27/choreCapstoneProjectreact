import React, { useState, useEffect } from 'react';
import KidNavbar from './KidNavbar';

const KidDashboard = () => {

    
        return (
            <div className='body'>
                <KidNavbar />
                <div className='jumbotron jumbotron'>
                    <div className='container'>
                        <h1 className='display-4'>Welcome</h1>
                        <p className='lead'>Let's earn some rewards!</p>
                    </div>
                </div>             
            </div>
        )
    }
 export default KidDashboard;