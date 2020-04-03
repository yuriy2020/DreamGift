import React from 'react';

export default class Reseacher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendName: '',
      heshtegs: ''
    };
  }

  async getHeshtegs() {
    const response = await fetch(
      `https://instagramdimashirokovv1.p.rapidapi.com/user/${this.state.friendName}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'InstagramdimashirokovV1.p.rapidapi.com',
          'x-rapidapi-key': '99d2bc2f27msh29e5bdde481eea8p1947abjsnb6872fabc5dd'
        }
      }
    );
    const json = await response.json();
    console.log(json.edges);

    const text = json.edges.map((item) => {
      if (item.node.edge_media_to_caption.edges.length) {
        return item.node.edge_media_to_caption.edges[0].node.text;
      }
      return false;
    });
    text.filter((item) => item !== false);
    const all = [];
    text.map((item) => {
      for (let i = 0; i < item.length - 1; i++) {
        let word = '';
        if (item[i] === '#') {
          for (let j = i + 1; j < item.length; j++) {
            if (item[j] === ' ' || item[j] === '#') {
              break;
            }
            word += item[j];
          }
          all.push(word);
        }
      }
      return item;
    });
    this.setState({
      heshtegs: all
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  renderHeshtegs = () => {
    let heshtegs;
    if (this.state.heshtegs.length) {
      heshtegs = (
        <div>
          {this.state.heshtegs.map((item) => {
            return <li>{item}</li>;
          })}
        </div>
      );
    }
    return heshtegs;
  };

  render() {
    return (
      <>
        <div>
          Если твоего друга еще нет в нашем приложении, мы можем определить его интересы по профилю
          в Instagram и помочь тебе с поиском подарка. Тебе нужно всего лишь вписать ник друга, все
          остальное мы сделаем сами ;)
        </div>
        <br></br>
        <input placeholder="username Instagram" name="friendName" onChange={this.handleChange} />
        <button
          onClick={() => {
            this.getHeshtegs();
          }}
        >
          Искать
        </button>
        <br></br>

        {this.renderHeshtegs()}
      </>
    );
  }
}
