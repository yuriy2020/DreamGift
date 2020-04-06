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
  userAvatar,
  addHeshtegs,
  changePresent,
} from '/home/evgeniy/finalProject/DreamGift/src/redux/actions';

import Presents from '../Presents/Presents';
import UserFoto from '../UserFoto/UserFoto';

class PageFriend extends Component {
  state = {
    isAvatar: '',
    edit: false,
    userName: this.props.userName,
    userFamilyName: this.props.userFamilyName,
    userMiddleName: this.props.userMiddleName,
    userEmail: this.props.userEmail,
    userInfo: this.props.userInfo,
    userAvatar: this.props.userAvatar,
  };

  componentDidMount() {
    const img = localStorage.getItem('avatar');
    const heshtegs = localStorage.getItem('heshtegs');
    const userName = localStorage.getItem('userName');
    const userFamilyName = localStorage.getItem('userFamilyName');
    const userMiddleName = localStorage.getItem('userMiddleName');
    const userEmail = localStorage.getItem('userEmail');
    const userInfo = localStorage.getItem('userInfo');
    const presents = localStorage.getItem('presents');
    }
  



  render() {
    let login = this.props.login
    let foto;
    const avatar = localStorage.getItem('avatar');
    foto = avatar ? avatar : 'http://localhost:5000/images/avatarka.png';

    return (
      <div>
        <div className="row">
          {/* userFoto */}
          <div className="col s5">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
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
                <p>Login: {login}</p>
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
          <button
            className="waves-effect waves-light btn"
            onClick={() => this.props.changeModal(true)}
          >
            <i className="material-icons">brush</i>
          </button>
        </div>
        {/* Edit User Form */}
        <Presents />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accountHeshtegs: state.accountHeshtegs,
    // login: state.login,
    userName: state.userName,
    userMiddleName: state.userMiddleName,
    userFamilyName: state.userFamilyName,
    userEmail: state.userEmail,
    userInfo: state.userInfo,
    userAvatar: state.userAvatar,
  };
};


export default connect(mapStateToProps)(PageFriend);
