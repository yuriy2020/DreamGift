import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  userName,
  userFamilyName,
  userMiddleName,
  userEmail,
  userInfo,
  requestFetchToChangeInfo,
  changeModal,
  userAvatar
} from '../redux/actions';

import Presents from '../components/Presents/Presents';
import UserFoto from '../components/UserFoto/UserFoto';


class AccountPage extends Component {
  state = {
    isAvatar: '',
    edit: false,
    userName: this.props.userName,
    userFamilyName: this.props.userFamilyName,
    userMiddleName: this.props.userMiddleName,
    userEmail: this.props.userEmail,
    userInfo: this.props.userInfo,
    userAvatar: this.props.userAvatar
  };

  toggleUserEdit = () => {
    this.setState({
      edit: !this.state.edit,
    });
  };

  changeUserInfo = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  changeReduxStateAndDB = (event) => {
    event.preventDefault();
    const { userName, userFamilyName, userMiddleName, userEmail, userInfo, userAvatar } = this.state;
    this.props.userNameFunc(userName);
    this.props.userMiddleNameFunc(userMiddleName);
    this.props.userFamilyNameFunc(userFamilyName);
    this.props.userEmailFunc(userEmail);
    this.props.userInfoFunc(userInfo);
    this.props.userAvatarFunc(userAvatar)
    this.props.requestFetchToChangeInfo({
      login: this.props.login,
      userName,
      userFamilyName,
      userMiddleName,
      userEmail,
      userInfo,
    });
  };

  componentDidMount() {
    const img = localStorage.getItem('avatar');
    this.props.userAvatarFunc(img);
  }

  render() {
    let foto;
    const avatar = localStorage.getItem('avatar');
     foto = avatar ? avatar : 'http://localhost:5000/images/present.png'

    return (
      <div>
        <div className="row">
          {/* userFoto */}
          <div className="col s5">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={foto} alt="http://localhost:5000/images/present.png" />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  {this.props.userName}
                </span>

                <UserFoto />

              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  {this.props.userInfo}
                  <i className="material-icons right">close</i>
                </span>
                <p>{this.props.userInfo}</p>
              </div>
            </div>
          </div>
          {/* userInfo */}
          <div className="col s6">
            <div className="card-panel teal">
              <span className="white-text">
                <h4>
                  {this.props.userName} {this.props.userMiddleName} {this.props.userFamilyName}
                </h4>
                <p>Login: {this.props.login}</p>
                <p>Email: {this.props.userEmail}</p>
                <hr />
                <p>{this.props.userInfo}</p>
              </span>
            </div>
          </div>
          {/* Edit  */}
          <div className="col s1">
            <button className="waves-effect waves-light btn" onClick={() => this.toggleUserEdit()}>
              <i className="material-icons">brush</i>
            </button>
          </div>
        </div>
        <div>
          {/* Hashtags */}
          {this.props.accountHeshtegs.length ? (
            this.props.accountHeshtegs.map((tag) => {
              return (
                <div className="chip">
                  <a href={`/user/${tag}`}>{tag}</a>
                </div>
              );
            })
          ) : (
              <></>
            )}
          <button className="waves-effect waves-light btn" onClick={() => this.props.changeModal(true)}>
            <i className="material-icons">brush</i>
          </button>
        </div>
        {/* Edit User Form */}
        {this.state.edit ? (
          <div>
            <form className="col s12" onSubmit={this.changeReduxStateAndDB}>
              <div className="row">
                <div className="input-field col s4">
                  <input
                    id="first_name"
                    type="text"
                    className="validate"
                    name="userFamilyName"
                    //  value={this.state.userFamilyName}
                    onChange={(event) => this.changeUserInfo(event)}
                  />
                  <label htmlFor="first_name">Фамилия</label>
                </div>
                <div className="input-field col s4">
                  <input
                    id="last_name"
                    type="text"
                    className="validate"
                    name="userName"
                    onChange={(event) => this.changeUserInfo(event)}
                  />
                  <label htmlFor="last_name">Имя</label>
                </div>
                <div className="input-field col s4">
                  <input
                    id="middle_name"
                    type="text"
                    className="validate"
                    name="userMiddleName"
                    onChange={(event) => this.changeUserInfo(event)}
                  />
                  <label htmlFor="middle_name">Отчество</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="about_user"
                    type="text"
                    className="validate"
                    name="userInfo"
                    onChange={(event) => this.changeUserInfo(event)}
                  />
                  <label for="about_user">Обо мне</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10">
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    name="userEmail"
                    onChange={(event) => this.changeUserInfo(event)}
                  />
                  <label for="email">Email</label>
                </div>
                <div className="col s2">
                  <button className="btn waves-effect waves-light" type="submit">
                    Изменить
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : null}
        <Presents />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accountHeshtegs: state.accountHeshtegs,
    login: state.login,
    userName: state.userName,
    userMiddleName: state.userMiddleName,
    userFamilyName: state.userFamilyName,
    userEmail: state.userEmail,
    userInfo: state.userInfo,
    userAvatar: state.userAvatar
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userNameFunc: (payload) => dispatch(userName(payload)),
    userFamilyNameFunc: (payload) => dispatch(userFamilyName(payload)),
    userMiddleNameFunc: (payload) => dispatch(userMiddleName(payload)),
    userEmailFunc: (payload) => dispatch(userEmail(payload)),
    userInfoFunc: (payload) => dispatch(userInfo(payload)),
    requestFetchToChangeInfo: (payload) => dispatch(requestFetchToChangeInfo(payload)),
    changeModal: (payload) => dispatch(changeModal(payload)),
    userAvatarFunc: (payload) => dispatch(userAvatar(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
