import React, { Component } from 'react';
import '/home/evgeniy/finalProject/DreamGift/src/components/Presents/components/list/components/Present/Present.css';
import { connect } from 'react-redux';
import { changePresent } from '/home/evgeniy/finalProject/DreamGift/src/redux/actions';

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
    login: '',
    accountHeshtegs: '',
    presents: [],
<<<<<<< HEAD
    message: ""
=======
    status: '',
>>>>>>> b3093b051288f077dd7400dc86f18ef3b862fca6
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
      }));
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

  async givePresent(id) {
    // const proverka = this.state.presents.filter((item) => item.id === id);
    // if(proverka.id === id && proverka.status)
    

    const givePresent = this.state.presents.slice();

    console.log(givePresent,'sdfsdfsdf');
    
    givePresent.map((item) => {
    if (item.id === id && item.status === true) {
      item.status = false
    } else {
      item.status = true
    } 
  });
    this.props.changePresent(givePresent);
    await fetch('/savepresents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ presents: givePresent, login: this.props.login })
    });
    localStorage.setItem('presents', JSON.stringify(this.props.presents));
    this.setState({
      message: "Этот подарок выбран !"
    })
  }

  render() {
    let foto;
    const avatar = this.state.userAvatar;
    console.log(avatar, 'avatar in render');
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
                <img className="activator" src={foto} alt="Photo" />
              </div>
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
              <p>Email: {this.state.userEmail}</p>
              <hr />
              <p>{this.state.userInfo}</p>
            </span>
          </div>
        </div>

        {/* Hashtags */}
        <div>
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
        {/* Presents */}
        <div>
          <h3>Wishlist</h3>
          {this.state.presents.length ? (
            this.state.presents.map((item) => {
              return (<>
                <div>
                  <strong><span>{item.value}</span></strong><br></br>
                  <a href={`${item.href}`}>{item.href}</a>               
                </div> <br></br>
                <div className='col s1'>
              <button id={item.id} onClick={() => { return this.givePresent(item.id) }} 
              className='btn-small'>
              <i class="small material-icons">done</i>
              </button>
            </div>
            {this.state.message}
                </>
              );
            })
          ) : null
          }
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



export default connect(null, mapDispatchToProps)(PageFriend);
