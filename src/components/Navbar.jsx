import React, { Component } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <div className='row '>
                {/* color */}
                <nav className='col s12 purple darken-1'>    
                    <ul className='col s6 offset-s9'>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/auth/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/auth/signup">Sign Up</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
