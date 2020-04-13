import React from 'react';
import './friends.css';
import { connect } from 'react-redux';
import { getLogin } from '../../redux/actions';

class Friends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: undefined,
      friendName: undefined,
      userName: undefined,
      onlyMyfriends: undefined,
    };
  }

  componentDidMount() {
    this.onlyMyFriend();
    this.friend();
  }

  login = (event) => {
    this.setState({
      login: event.target.value,
    });
  };

  async friend() {
    let response = await fetch('/friendsSearch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ login: this.state.login }),
    });
    let result = await response.json();
    this.setState({
      friendName: result.users,
    });
    localStorage.setItem('allUsers', JSON.stringify(result.users));
  }

  async onlyMyFriend() {
    if (this.props.login) {
      let response = await fetch('/onlyMyFriend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset = utf-8' },
        body: JSON.stringify({ login: this.props.login }),
      });
      let result = await response.json();
      localStorage.setItem('friends', result.myFriend);
      this.setState({
        onlyMyfriends: result.myFriend,
      });
    } else {
      const friends = localStorage.getItem('friends');
      if (friends && friends.length) {
        this.setState({
          onlyMyfriends: friends.split(','),
        });
      }
    }
  }

  searchFromList() {
    let newarr = this.state.friendName.slice();
    const res = newarr.filter(
      (item) => item.login.toLowerCase() === this.state.login.toLowerCase()
    );
    if (res.length > 0) {
      this.setState({
        userName: res[0].login,
      });
    } else {
      this.setState({
        userName: 'Нет такого пользователя !',
      });
    }
  }

  async addFriend(friend) {
    const response = await fetch('/addFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ friend: friend }),
    });
    const json = await response.json();
    this.setState({
      onlyMyfriends: json.friends,
    });
    localStorage.setItem('friends', json.friends);
  }

  renderButton() {
    const login = localStorage.getItem('login');
    let arrPeople = [];
    if (this.state.friendName) {
      this.state.friendName.map((item) => {
        return arrPeople.push(item.login);
      });
    }
    if (
      this.state.userName &&
      this.state.userName !== login &&
      this.state.onlyMyfriends &&
      this.state.onlyMyfriends.indexOf(this.state.userName) !== -1
    ) {
      return <span> Это ваш друг</span>;
    }
    if (
      this.state.userName &&
      this.state.userName !== login &&
      arrPeople.includes(this.state.userName)
    ) {
      return (
        <div className="col s4">
          <button className="btn-small" onClick={() => this.addFriend(this.state.userName)}>
            Добавить
          </button>
        </div>
      );
    } else if (this.state.userName === login) {
      return <span> Это вы</span>;
    }
    return <></>;
  }

  async deleteFriend(login) {
    const response = await fetch('/removeFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ login }),
    });
    const json = await response.json();
    this.setState({
      onlyMyfriends: json.newFriends,
    });
    localStorage.setItem('friends', json.newFriends);
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col s10">
            <input onChange={(e) => this.login(e)} name="login" placeholder="Введите логин"></input>
          </div>
          <div className="col s2">
            <button className="btn" onClick={() => this.searchFromList()}>
              Search
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col s4">
            <a href={`/page/${this.state.userName}`} id={this.state.userName}>
              {this.state.userName}
            </a>
          </div>

          {this.renderButton()}
        </div>
        {/* <p>!!!! Все друзья (их надо будет убрать потом) !!!!</p>
        <ul>
          {this.state.friendName
            ? this.state.friendName.map((item, index) => {
                const photo = item.userAvatar
                  ? `http://localhost:5000/images/${item.userAvatar}`
                  : 'http://localhost:5000/images/avatarka.png';
                return (
                  <li>
                    <a href={`/page/${item.login}`} id={item.login}>
                      <img src={photo} alt="" width="30px" height="30px" />
                      Пользователь: {item.login}
                    </a>
                  </li>
                );
              })
            : null}
        </ul> */}
        <div id="myfriendsContainer">
          <h4 className="center "> Мои друзья:</h4>
          <div className="manyCards">
            {this.state.friendName && this.state.onlyMyfriends
              ? this.state.onlyMyfriends.map((item, index) => {
                  const user = this.state.friendName.find((user) => user.login === item);
                  if (user) {
                  const photo = user.userAvatar
                    ? `http://localhost:5000/images/${user.userAvatar}`
                    : 'http://localhost:5000/images/avatarka.png';
                  return (
                    <div className="friend-card">
                      <div>
                        <img src={photo} alt="" />
                      </div>

                      <div>
                        <button
                          className="btn-small"
                          onClick={() => {
                            this.deleteFriend(item);
                          }}
                        >
                          Удалить
                        </button>
                      </div>
                      <div>
                        <a href={`/page/${item}`} id={item}>
                          <strong className="black-text">{item}</strong>
                        </a>
                      </div>
                    </div>
                  );
                }})
              : null}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLogin: (payload) => dispatch(getLogin(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
