import React from 'react';
import { connect } from 'react-redux';
import {
  isAuth,
  getLogin,
  requestFetchToLogin
} from '../../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  logIn() {
    this.props.getLogin(this.state.login);
    localStorage.setItem('login', this.state.login);
    this.props.history.push('/');
  }

  renderError() {
    let err;
    if (this.props.error) {
      err = <span>Error: {this.props.error}</span>;
    }
    return err;
  }

  render() {
    if (this.props.auth) {
      this.logIn();
    }
    return (
      <div onChange={this.handleChange}>
      {this.renderError()}
        <input type="text" placeholder="login" name="login" />
        <input type="password" placeholder="password" name="password" />
        <button
          onClick={() =>
            this.props.requestFetchToLogin({
              login: this.state.login,
              password: this.state.password
            })
          }
        >
          Log in
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    error: state.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isAuth: (payload) => dispatch(isAuth(payload)),
    getLogin: (payload) => dispatch(getLogin(payload)),
    requestFetchToLogin: (payload) => dispatch(requestFetchToLogin(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
