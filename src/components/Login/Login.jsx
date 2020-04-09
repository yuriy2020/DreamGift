import React from 'react';
import { connect } from 'react-redux';
import { isAuth, getLogin, requestFetchToLogin } from '../../redux/actions';
import './Login.css';

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
      [event.target.name]: event.target.value,
    });
  };

  logIn() {
    this.props.getLogin(this.state.login);
    localStorage.setItem('login', this.state.login);
    this.props.history.push('/');
  }

  // renderError() {
  //   let err;
  //   if (this.props.error) {
  //     err = <span>Error: {this.props.error}</span>;
  //   }
  //   return err;
  // }

  render() {
    if (this.props.auth) {
      this.logIn();
    }
    return (
      <div onChange={this.handleChange} className="overlay">
        <div className="form">
          <div className="con">
            <header className="head-form">
              <h2>Log In</h2>
              <p>login here using your username and password</p>
            </header>
            <br></br>
            <div className="field-set">
              <input type="text" placeholder="login" name="login" className="form-input" required />
              <br></br>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="form-input"
                id="pwd"
                required
              />
              <br></br>
              <button
                className="log-in"
                onClick={() =>
                  this.props.requestFetchToLogin({
                    login: this.state.login,
                    password: this.state.password,
                  })
                }
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    error: state.error,
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
