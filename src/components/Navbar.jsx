import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAuth, getLogin } from '../redux/actions';

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
    }
    console.log(json);
  }

  render() {
    if (!this.props.auth) {
      return (
        <div className='row'>
          <nav className='col s12'>
            <ul className='col s6 offset-s9'>
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
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
              <Link>{this.props.login}</Link>
              </li>
              <li>
                <Link onClick={() => this.logOut()}>Log out</Link>
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
    getLogin: (payload) => dispatch(getLogin(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
