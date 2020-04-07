import React, { Component } from 'react'
import logo from '../images/logo.png'
import Friends from '../components/friends/friends'
import Calendar from '../components/Calendar/Calendar'
import './css/HomePage.css'
export default class HomePage extends Component {
    render() {
        return (
            <div className="background">
                <div className='opacity'>
                    <div className='row'>
                        <div className="col s6">
                            <Friends />
                        </div>
                        <div className='col s6 push-s1'>
                            <Calendar />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
