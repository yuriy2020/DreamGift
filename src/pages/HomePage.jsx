import React, { Component } from 'react'
import logo from '../images/logo.png'
import Friends from '../components/friends/friends'

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <img src={logo} alt=""/>
                <Friends />
            </div>
        )
    }
}
