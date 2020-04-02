import React, { Component } from 'react'
import HomePage from './pages/HomePage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar'
import AuthPage from './pages/AuthPage'
import './App.css'
import AccountPage from './pages/AccountPage';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='container bgcolor'>

          <Navbar />

          <Switch>
            <Route path='/auth'>
              <AuthPage />
            </Route>
            <Route path='/account'>
              <AccountPage />
            </Route>
            <Route path='/'>
              <HomePage />
            </Route>
          </Switch>

        </div>
      </Router>

    )
  }
}
