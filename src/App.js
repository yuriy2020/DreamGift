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
import { connect } from 'react-redux';
import Amazon from '../src/components/Amazon/Amazon'
import PageFriend from './components/PageFriend/PageFriend';


class App extends React.Component {

  isModal() {
    if (this.props.isModalOpen) {
      return <Modal />
    }
  }

  render() {
    return (
      <div className='container'>
        <Navbar />
        {this.isModal()}
        <div>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/signup" render={(props) => <Signup {...props} />} />
            <Route exact path="/login" render={(props) => <Login {...props} />} />
            <Route exact path="/reseach" component={Reseacher} />
            <Route exact path="/account" component={AccountPage} />
            <Route exact path="/user/:id" render={(props) => <Amazon {...props} id={props.match.params.id} />} />
            <Route exact path="/page/:id" render={(props) => <PageFriend {...props} id={props.match.params.id} />} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.isModalOpen
  };
};

export default connect(mapStateToProps)(App);
