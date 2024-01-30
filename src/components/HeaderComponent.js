import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark p-3'>
                    <div>
                        <a className='navbar-brand m-5' href="">Reward Management System</a>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent