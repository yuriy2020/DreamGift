import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/AccountPage.css'
import {
  userName,
  userFamilyName,
  userMiddleName,
  userEmail,
  userInfo,
  requestFetchToChangeInfo,
  changeModal,
  userAvatar,
  addHeshtegs,
  changePresent,
  userBirthdate
} from '../redux/actions';

import Presents from '../components/Presents/Presents';
import UserFoto from '../components/UserFoto/UserFoto';
import Hashtags from '../components/HashTags/Hashtags';

class AccountPage extends Component {
  state = {
    isAvatar: '',
    edit: false,
    userName: this.props.userName,
    userFamilyName: this.props.userFamilyName,
    userMiddleName: this.props.userMiddleName,
    userEmail: this.props.userEmail,
    userInfo: this.props.userInfo,
    userAvatar: this.props.userAvatar,
    userBirthdate: this.props.userBirthdate
  };

  componentDidMount() {
    const img = localStorage.getItem('avatar');
    this.props.userAvatarFunc(img);
    const heshtegs = localStorage.getItem('heshtegs');
    if (heshtegs && heshtegs.length) {
      this.props.addHeshtegs(heshtegs.split(','));
    }
    const userName = localStorage.getItem('userName');
    const userFamilyName = localStorage.getItem('userFamilyName');
    const userMiddleName = localStorage.getItem('userMiddleName');
    const userEmail = localStorage.getItem('userEmail');
    const userInfo = localStorage.getItem('userInfo');
    const userBirthdate = localStorage.getItem('userBirthdate');
    this.props.userBirthdateFunc(userBirthdate)
    this.props.userNameFunc(userName);
    this.props.userMiddleNameFunc(userMiddleName);
    this.props.userFamilyNameFunc(userFamilyName);
    this.props.userEmailFunc(userEmail);
    this.props.userBirthdateFunc(userBirthdate);
    this.props.userInfoFunc(userInfo);
    const presents = localStorage.getItem('presents');
    if (presents) {
      this.props.changePresent(JSON.parse(presents));
    }
  }

  toggleUserEdit = () => {
    this.setState({
      edit: !this.state.edit,
    });
  };

  changeUserInfo = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.name === 'userBirthdate') {
      this.setState({
        userBirthdate: new Date(event.target.value).toDateString(),
      })
    }
  };

  changeReduxStateAndDB = (event) => {
    event.preventDefault();
    const {
      userName,
      userFamilyName,
      userMiddleName,
      userEmail,
      userInfo,
      userAvatar,
      userBirthdate
    } = this.state;
    if (userName && userName.length) {
      this.props.userNameFunc(userName);
      localStorage.setItem('userName', userName);
    }
    if (userMiddleName && userMiddleName.length) {
      this.props.userMiddleNameFunc(userMiddleName);
      localStorage.setItem('userMiddleName', userMiddleName);
    }
    if (userFamilyName && userFamilyName.length) {
      this.props.userFamilyNameFunc(userFamilyName);
      localStorage.setItem('userFamilyName', userFamilyName);
    }
    if (userEmail && userEmail.length) {
      this.props.userEmailFunc(userEmail);
      localStorage.setItem('userEmail', userEmail);
    }
    if (userInfo && userInfo.length) {
      this.props.userInfoFunc(userInfo);
      localStorage.setItem('userInfo', userInfo);
    }
    if (userBirthdate) {
      this.props.userBirthdateFunc(userBirthdate);
      localStorage.setItem('userBirthdate', userBirthdate);
    }
    this.props.userAvatarFunc(userAvatar);
    this.props.requestFetchToChangeInfo({
      login: this.props.login,
      userName,
      userFamilyName,
      userMiddleName,
      userEmail,
      userInfo,
      userBirthdate,
    });
    this.toggleUserEdit();
  };

  render() {
    let foto;
    const avatar = localStorage.getItem('avatar');
    foto = avatar ? avatar : 'http://localhost:5000/images/avatarka.png';

    return (
      <div>
        <div className="row">
          {/* userFoto */}
          <div className="col s6">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light img_crop">
                <img
                  className="activator"
                  src={foto}
                  alt="http://localhost:5000/images/present.png"
                />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  {this.props.userName}
                </span>

                <UserFoto />
                <Hashtags />
                
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
                <p>Birthdate: {this.props.userBirthdate}</p>
                <p>Email: {this.props.userEmail}</p>
                <hr />
                <p>{this.props.userInfo}</p>
              </span>

              {/* Edit icon  */}

              <button className="waves-effect waves-light btn teal darken-4 " onClick={() => this.toggleUserEdit()}>
                <i className="material-icons">brush</i>
              </button>

            </div>

          </div>

          <div className="col s6">
            <Presents />
          </div>
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
                <div className="input-field col s5">
                  <input
                    id="birthdate"
                    type="date"
                    className="validate"
                    name="userBirthdate"
                    onChange={(event) => this.changeUserInfo(event)}
                  />
                  <label for="birthdate">Дата рождения</label>
                </div>
              
                <div className="input-field col s5">
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
    userAvatar: state.userAvatar,
    userBirthdate: state.userBirthdate
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
    addHeshtegs: (payload) => dispatch(addHeshtegs(payload)),
    changePresent: (payload) => dispatch(changePresent(payload)),
    userBirthdateFunc: (payload) => dispatch(userBirthdate(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
