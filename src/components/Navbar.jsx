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
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                        <li>
                            <Link to="/">Sign Up</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
