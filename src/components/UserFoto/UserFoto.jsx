import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userAvatar } from '../../redux/actions';

class UserFoto extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
  }

  async onFileChange(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImg', e.target.files[0]);
 
    axios.post(`http://localhost:5000/user/profile/edit/img/${this.props.login}`, formData, {
    login: this.props.login
    }).then((res) => {
      const img = `/images/${res.data.filename.toLowerCase()}`;
      localStorage.setItem('avatar', img);
      this.props.userAvatarFunc(img);
    });
  }

  render() {
    return (
      <div>
        <form>
          <div className="file-field input-field">
            <div className="btn">
              <span>change avatar</span>
              <input name="ava" id="ava" type="file" onChange={this.onFileChange} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userAvatarFunc: (payload) => dispatch(userAvatar(payload)),
  };
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserFoto));
