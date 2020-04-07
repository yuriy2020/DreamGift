import React from 'react';

export default class Friends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: undefined,
      friendName: '',
      userName: undefined,
    };
  }

  componentDidMount() {
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
      body: JSON.stringify({ login: this.state.login })
    });

    let result = await response.json();
    this.setState({
      friendName: result.users
    })
    console.log(result, "jkhkjhkjhkjh");
  }

  searchFromList() {
    let newarr = this.state.friendName.slice();
    const res = newarr.filter((item) => item.login === this.state.login);
    console.log(res);
    if (res.length > 0) {
      this.setState({
        userName: res[0].login,
      });
    } else {
      {
        this.setState({
          userName: 'Нет такой буквы !',
        });
      }
    }
  }

  render() {

    const { login } = this.state;

    return (
      <>
        <input onChange={(e) => this.login(e)} name="login" placeholder="Введите логин"></input>
        <button className='btn' onClick={() => this.searchFromList()}>Search</button>
        <div>{this.state.userName}</div>
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
      </>
    );
  }
}
