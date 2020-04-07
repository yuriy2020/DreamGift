import React from 'react';

export default class Friends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: undefined,
      friendName: '',
      userName: undefined,
      onlyMyfriends: ''
    };
  }

  componentDidMount() {
    this.friend();
    this.onlyMyFriend()
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
      body: JSON.stringify({ login: this.state.login })
    });

    let result = await response.json();
    this.setState({
      friendName: result.users
    })
    console.log(result, "jkhkjhkjhkjh");
  }

  async onlyMyFriend() {
    let response = await fetch('/onlyMyFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
    });

    let result = await response.json();
    this.setState({
      onlyMyfriends: result.myFriend
    })
    console.log(result, "jkhkjhkjhkjh");
  }

  searchFromList() {
    let newarr = this.state.friendName.slice();
    console.log(newarr, 'kkkkkkk');
    
    const res = newarr.filter((item) => item.login === this.state.login);
    console.log(res, 'rrrrrrr');
    if (res.length > 0) {
      this.setState({
        userName: res[0].login
      });
    } else {
      {
        this.setState({
          userName: 'Нет такой буквы !',
        });
      }
    }
  }

  async addFriend(friend) {
    await fetch('/addFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({friend: friend })
    }); 
    
  }
 

  render() {

    const { userName } = this.state;

    return (
      <>
        <input onChange={(e) => this.login(e)} name="login" placeholder="Введите логин"></input>
        <button onClick={() => this.searchFromList()}>Search</button>
        <div>

        <a href={`/page/${this.state.userName}`} id={this.state.userName}>{this.state.userName}</a>
        
        <button onClick={() => this.addFriend(userName)}>Добавить</button>
        </div>
        <p>!!!! Все друзья (их надо будет убрать потом) !!!!</p>
        <ul>
          {this.state.friendName.length
            ? this.state.friendName.map((item, index) => {
                return (
                  <li>
                    {' '}
                    <a href={`/page/${item.login}`} id={item.login}>Пользователь: {item.login}</a>
                  </li>
                );
              })
            : null}
        </ul>
        <p> !!!! Добавленные друзья пользователя !!!!</p>
        <ul>
          {this.state.onlyMyfriends.length
            ? this.state.onlyMyfriends.map((item, index) => {
                return (
                  <li>
                     <a href={`/page/${item}`} id={item}>Пользователь: {item}</a>
                  </li>
                );
              })
            : null}
        </ul>
      </>
    );
  }
}
