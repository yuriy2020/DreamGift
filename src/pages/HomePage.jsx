import React, { Component } from 'react'
import logo from '../images/logo.png'
import Friends from '../components/friends/friends'

export default class HomePage extends Component {
    render() {
        return (
            <div className='row'>
                <div className="col s5">
                    <Friends />
                </div>
                <div className="col s6 ">
                    <img src={logo} alt="" />

                </div>


            </div>
        )
    }
}
