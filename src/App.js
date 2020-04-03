import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar'
import AuthPage from './pages/AuthPage'
import './App.css'
import AccountPage from './pages/AccountPage';
import Reseacher from './components/Reseacher/Reseacher';
import Modal from './components/Modal/Modal'

export default class App extends React.Component {
  render() {
    return (
        <div className='container'>
          <Navbar />
          <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/signup" render={(props) => <Signup {...props} />} />
            <Route exact path="/login" render={(props) => <Login {...props} />} />
            <Route exact path="/reseach" component={Reseacher} />
            <Route exact path="/account" component={AccountPage} />
          </Switch>
        </div>
        <Modal />
        </div>
    )
  }
}
