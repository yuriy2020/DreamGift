import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePresent } from '../../redux/actions';
import './PageFriends.css'

class PageFriend extends Component {
  state = {
    isAvatar: '',
    edit: false,
    userName: undefined,
    userFamilyName: undefined,
    userMiddleName: undefined,
    userEmail: undefined,
    userInfo: undefined,
    userAvatar: undefined,
    login: undefined,
    accountHeshtegs: '',
    presents: [],
    message: "Dobavlen",
    status: '',
    userBirthday: undefined
  };

  async searchFriend(id) {
    if (id) {
      let url = `/page/${id}`;
      let response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset = utf-8' },
        body: JSON.stringify({ login: id }),
      });
      let result = await response.json();
      return result;
    }
  }

  componentDidMount() {
    this.searchFriend(this.props.id).then((result) => {
      this.setState((prevState) => ({
        ...prevState,
        isAvatar: '',
        edit: false,
        userName: result.user.userName,
        userFamilyName: result.user.userFamilyName,
        userMiddleName: result.user.userMiddleName,
        userEmail: result.user.userEmail,
        userInfo: result.user.userInfo,
        userAvatar: result.user.userAvatar,
        login: result.user.login,
        accountHeshtegs: result.user.heshtegs,
        presents: result.user.presents,
        userBirthday: result.user.userBirthdate
      }));
      if (this.state.userBirthday) {
        this.setState({
          userBirthday: new Date(this.state.userBirthday).toDateString(),
        })
      }
      localStorage.setItem('friendPhoto', this.state.userAvatar);
      const login = localStorage.getItem('login');
      if (login && this.state.login) {
        const friends = localStorage.getItem('friends').split(',');
        if (this.state.login !== login) {
          if (friends && friends.includes(this.state.login) === true) {
            this.setState({
              status: 'friend',
            });
          } else {
            this.setState({
              status: 'notFriend',
            });
          }
        }
      }
    });
     
  }

  renderButton() {
    if (this.state.status === 'friend') {
      return <button className="btn" onClick={() => this.deleteFriend(this.state.login)}>Удалить из друзей</button>;
    }
    if (this.state.status === 'notFriend') {
      return <button className="btn" onClick={() => this.addFriend(this.state.login)}>Добавить в друзья</button>;
    }
    return <></>;
  }

  async addFriend(friend) {
    const response = await fetch('/addFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ friend: friend }),
    });
    const json = await response.json();
    localStorage.setItem('friends', json.friends);
    this.setState({
      status: 'friend'
    })
  }

  async deleteFriend(login) {
    const response = await fetch('/removeFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ login }),
    });
    const json = await response.json();
    localStorage.setItem('friends', json.newFriends);
    this.setState({
      status: 'notFriend'
    });
  }

  async unGivePresent(id) {
    const givePresent = this.state.presents.slice();

    givePresent.map((item) => {
      if (item.id === id && item.friend === this.props.login) {

        if (item.status === true) {
          item.status = false;
          item.friend = ""
        }
      }
      return item
    });

    this.props.changePresent(givePresent);
    await fetch('/savepresents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ presents: givePresent, login: this.state.login })
    });
    this.setState({
      presents: givePresent,
    });
  }

  async givePresent(id) {
    const givePresent = this.state.presents.slice();
    givePresent.map((item) => {

      if (item.id === id) {

        if (item.status === false) {
          item.status = true;
          item.friend = this.props.login
        }
      }


      return item
    });
    this.props.changePresent(givePresent);
    await fetch('/savepresents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ presents: givePresent, login: this.state.login })
    });
    this.setState({
      presents: givePresent,
    });
  }

  getStatus(item) {
    if (item.status === true) {
      return (<>

        <div className='lineStatus'>
            <button id={item.id} onClick={() => { return this.unGivePresent(item.id) }}
              className='btn-small cancelButton  red lighten-2 ' >
              <i className="small material-icons ">cancel_presentation</i>
            </button>

            <span className="presentIsSelected">Подарок выбран пользователем {item.friend}</span>

        </div>

      </>)
    } else {
      return (<>
        <div className='lineStatus'>
          <button id={item.id} onClick={() => { return this.givePresent(item.id) }}
            className='btn-small'>
            <i className="small material-icons">done</i>
          </button>
        </div>

      </>)
    }
  }

  render() {
    let foto;
    const avatar = this.state.userAvatar;
    foto =
      avatar && avatar !== 'undefined'
        ? `http://localhost:5000/images/${avatar}`
        : 'http://localhost:5000/images/avatarka.png';
    return (
      <>
        {this.renderButton()}
        <div className="row">
          {/* userFoto */}
          <div className="col s6">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light img_crop">
                <img className="activator" src={foto} alt="img" />
              </div>
            </div>
          </div>

          {/* userInfo */}
          <div className="col s6">
            <div className="card-panel teal">
              <span className="white-text">
                <h4>
                  {this.state.userName} {this.state.userMiddleName} {this.state.userFamilyName}
                </h4>
                <p>Login: {this.state.login}</p>
                <p>Birthdate: {this.state.userBirthday}</p>
                <p>Email: {this.state.userEmail}</p>
                <hr />
                <p>{this.state.userInfo}</p>
              </span>
            </div>
          </div>

          {/* Presents */}
          <div>
            <div >
              <h5>Подарки, которые хотел бы получить {this.state.login}</h5>
              <div className="listContainer">
              {this.state.presents.length ? (
                this.state.presents.map((item) => {
                  return (
                    <div className="frindsWishes">
                      <div className="statusContainer">
                        {this.getStatus(item)}

                      </div>
                      <div className='linkAndName'>
                        <div className="nameSurname">
                          <strong><span>{item.value}</span></strong>

                        </div>
                        <div className="nameSurname">
                          <a href={`${item.href}`}>{item.href}</a>
                        </div>

                      </div>


                    </div>


               
                 
                  );
                })  
              ) : null
              }</div>
            </div>
          </div>

        </div>


        {/* Hashtags */}
        <div className='hashtagsContainer'>
          {this.state.accountHeshtegs.length ? (
            this.state.accountHeshtegs.map((tag) => {
              return (
                <div className="chip">
                  <a href={`/user/${tag}`}>{tag}</a>
                </div>
              );
            })
          ) : (
              <></>
            )}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePresent: (payload) => dispatch(changePresent(payload)),
  };
};

const mapStateToProps = (state) => {
  return {
    login: state.login
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(PageFriend);
