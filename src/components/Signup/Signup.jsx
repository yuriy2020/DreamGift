import React from 'react';
import './SignUp.css';
import { connect } from 'react-redux';
import {
  isAuth,
  getLogin,
  requestFetchToSignUp,
} from '../../redux/actions';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  signUp() {
    this.props.getLogin(this.state.login);
    localStorage.setItem('login', this.state.login);
    this.props.history.push('/');
  }

  render() {
    if (this.props.auth) {
      this.signUp();
    }
    return (
      <div onChange={this.handleChange}>
        <input type="text" placeholder="login" name="login" />
        <input type="email" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        <button
          onClick={() =>
            this.props.requestFetchToSignUp({
              login: this.state.login,
              email: this.state.email,
              password: this.state.password
            })
          }
          outline
          color="secondary"
        >
          Sign up
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
    requestFetchToSignUp: (payload) => dispatch(requestFetchToSignUp(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
