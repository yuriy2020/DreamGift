import React, { Component } from 'react'
import HomePage from './pages/HomePage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Navbar />
          <HomePage />

        </div>

      </Router>

    )
  }
}
