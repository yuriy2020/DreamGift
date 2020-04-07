import React from 'react';

export default class Friends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: undefined,
      friendName: '',
      userName: undefined,
      onlyMyfriends: '',
    };
  }

  componentDidMount() {
    this.friend();
    this.onlyMyFriend();
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
  }

  async onlyMyFriend() {
    let response = await fetch('/onlyMyFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
    });
    let result = await response.json();
    this.setState({
      onlyMyfriends: result.myFriend,
    });
  }

  searchFromList() {
    let newarr = this.state.friendName.slice();
    const res = newarr.filter((item) => item.login === this.state.login);
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
    await fetch('/addFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ friend: friend }),
    });
  }

  renderButton() {
    const login = localStorage.getItem('login');
    let arrPeople = [];
    if (this.state.friendName) {
      this.state.friendName.map((item) => {
        arrPeople.push(item.login);
      });
    }
    let res;
    if (
      this.state.userName &&
      this.state.userName !== login &&
      arrPeople.includes(this.state.userName)
    ) {
      res = <button onClick={() => this.addFriend(this.state.userName)}>Добавить</button>;
    } 
    else if (this.state.userName === login) {
      res = <span> Это вы</span>;
    } else {
      res = <></>;
    }
    return res;
  }

  async deleteFriend(event) {
    const login = event.target.previousElementSibling.id;
    await fetch('/removeFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ login }),
    });
  }

  render() {
    return (
      <>
        <input onChange={(e) => this.login(e)} name="login" placeholder="Введите логин"></input>
        <button className="btn" onClick={() => this.searchFromList()}>Search</button>
        <div>
          <a href={`/page/${this.state.userName}`} id={this.state.userName}>
            {this.state.userName}
          </a>

          {this.renderButton()}
        </div>
        <p>!!!! Все друзья (их надо будет убрать потом) !!!!</p>
        <ul>
          {this.state.friendName.length
            ? this.state.friendName.map((item, index) => {
                return (
                  <li>
                    <a href={`/page/${item.login}`} id={item.login}> 
                    <i class="material-icons">face</i>
                    Пользователь: {item.login}
                    </a>
                  </li>
                );
              })
            : null}
        </ul>
        <p> Мои друзья:</p>
        <ul>
          {this.state.onlyMyfriends.length
            ? this.state.onlyMyfriends.map((item, index) => {
                return (
                  <li>
                    <a href={`/page/${item}`} id={item}>
                      Пользователь: {item}
                    </a>
                    <button onClick={this.deleteFriend}>Удалить из друзей</button>
                  </li>
                );
              })
            : null}
        </ul>
      </>
    );
  }
}
