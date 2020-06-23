import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAuth, getLogin, userAvatar } from '../redux/actions';

class Navbar extends React.Component {
  async sessionChecker() {
    const response = await fetch('/check', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset = utf-8' }
    });
    const json = await response.json();
    if (json.res === true) {
      this.props.isAuth(true);
      const login = localStorage.getItem('login');
      this.props.getLogin(login);
    }
  }

  componentDidMount() {
    this.sessionChecker();
  }

  async logOut() {
    const response = await fetch('/logout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset = utf-8' }
    });
    const json = await response.json();
    if (json.res === true) {
      this.props.isAuth(false);
    };
    localStorage.clear();
  }

  render() {
    if (!this.props.auth) {
      return (
        <div className='row'>
          <nav className='col s12'>
          <ul className='col s6 offset-s7'>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    } else {
      return (
        <div className='row'>
        <nav className='col s12'>
        <ul className='col s6 offset-s7'>
              <li>
              <Link to='/account'>{this.props.login}</Link>
              </li>
              <li>
                <Link to="/">My Friends</Link>
              </li>
              <li>
              <Link to='/reseach'>Insta</Link>
              </li>
              <li>
                <Link to='/' onClick={() => this.logOut()}>Log out</Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    login: state.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isAuth: (payload) => dispatch(isAuth(payload)),
    getLogin: (payload) => dispatch(getLogin(payload)),
    userAvatarFunc: (payload) => dispatch(userAvatar(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
