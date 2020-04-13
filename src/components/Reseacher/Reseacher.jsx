import React from 'react';

export default class Reseacher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendName: '',
      heshtegs: '',
      text: undefined,
      arrAmazon: undefined,
      textAli: undefined,
      arrAliProd: undefined,
      newTaskAli: undefined,
      arrAliCat: undefined
    };
  }

  componentDidMount() {
    this.category()
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


    // const all = ['лопата', 'фонарь', 'cапоги', 'Book', 'Dress']

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

  takeText = (e) => {
    this.setState({
      text: e.target.value,
    })
  }

  async AmazonSearch(t) {

    let url = `https://amazon-price1.p.rapidapi.com/search?keywords=${t}&marketplace=ES`
    let response = await fetch(url, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "amazon-price1.p.rapidapi.com",
        "x-rapidapi-key": "5034190542mshce3429305e9c4d0p1c67f2jsn699c5a3523b3"
      }
    })

    let result = await response.json();
    this.setState({
      arrAmazon: result
    })
  }

  async onlyCateg(name) {
    const newTasks = this.state.arrAliCat.filter((item) => item.name.includes(name) === true);
    if(newTasks.length >=1 ) {
      if(newTasks[0].name === name) 
    this.setState(prevState => ({
      ...prevState,
      newTaskAli: newTasks[0].id
    }), async () => await this.productOfCategory(this.state.newTaskAli))
  
}
}

  async category() {
    let response = await fetch("https://ali-express1.p.rapidapi.com/categories", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "ali-express1.p.rapidapi.com",
        "x-rapidapi-key": "5034190542mshce3429305e9c4d0p1c67f2jsn699c5a3523b3"
      }
    })

    let result = await response.json();
    this.setState({
      arrAliCat: result.categories
    })
  }

  async productOfCategory(id) {
    if (id) {
      let url = `https://ali-express1.p.rapidapi.com/productsByCategory/${id}?from=0`
      let response = await fetch(url, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "ali-express1.p.rapidapi.com",
          "x-rapidapi-key": "5034190542mshce3429305e9c4d0p1c67f2jsn699c5a3523b3"
        }
      })

      let result = await response.json();
      this.setState({
        arrAliProd: result
      })
    }

  }

  render() {

    return (
      <>
        <div>
          <blockquote>
            <strong>
              Если твоего друга еще нет в нашем приложении, мы можем определить его интересы по профилю
              в Instagram и помочь тебе с поиском подарка.
              </strong>
            <br />
            <strong>
              Тебе нужно всего лишь вписать ник друга, все
              остальное мы сделаем сами ;)
            </strong>
          </blockquote>

        </div>
        <br></br>
        <div className='row'>
          <div className='col s9'>
            <input placeholder="username Instagram" name="friendName" onChange={this.handleChange} />
          </div>
          <div className='col s3'>
            <button className='btn'
              onClick={() => {
                this.getHeshtegs();
              }}
            >
              Искать
        </button>
          </div>
        </div>
        <br></br>
        <ul>

          {this.state.heshtegs ? this.state.heshtegs.map((item, index) => {
            return (
              <div>
                <li>
                  <div className='row'>
                    <div className='col s4 push-s2' >
                      {item}
                    </div>
                    <div className='col s4' >
                      <button className="btn-small col pull-s1" onClick={() => this.onlyCateg(item)}>Искать на али</button>
                      <button className="btn-small" onClick={() => this.AmazonSearch(item)}> Искать на Амазон</button>
                    </div>
                  </div>
                </li>
              </div>
            )
          }) : null
          }
        </ul>
        {/* 
        <input onChange={(e) => this.takeText(e)} name="text"></input>
        <button onClick={() => this.AmazonSearch(text)}>AmazonSearch</button> */}

        {/* <ul>
          {this.state.arrAmazon ? this.state.arrAmazon.map((item, index) => {
            return <li>{item.title}<img src={item.imageUrl} /><a href={item.detailPageURL}>Перейти на Амазон</a></li>;
          }) : null
          }
        </ul> */}

        <div className="row">
          {this.state.arrAmazon ? this.state.arrAmazon.map((item, index) => {
            return (
              <div className="col s3" style={{ marginTop: 10 }}>
                <a href={item.detailPageURL} target='blank' title="Перейти на Amazon">
                  <img src={item.imageUrl} alt="" />
                </a>
                <p style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{item.title}</p>
                {/* <button className="btn-small waves-effect waves-light" onClick={() => { this.addPresent(item.title, item.detailPageURL) }}>Добавить в мои подарки</button> */}
              </div>
            )
          }) : null
          }
        </div>

        <div className="row">
        {this.state.arrAliProd && this.state.arrAliProd.data ? this.state.arrAliProd.data.items.map((item, index) => {
            return (
              <div className="col s3" style={{ marginTop: 10 }}>
                <a href={item.action} target='blank' title="Перейти на Ali">
                  <img src={item.productElements.image.imgUrl} alt="" />
                </a>
                <p style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{item.productElements.title.title}</p>
                {/* <button className="btn-small waves-effect waves-light" onClick={() => { this.addPresent(item.productElements.title.title, item.action) }}>Добавить в мои подарки</button> */}
              </div>
            )
          }) : null
          }
        </div>

        {/* <ul>
          {this.state.arrAliProd && this.state.arrAliProd.data ? this.state.arrAliProd.data.items.map((item, index) => {
            return <li>
              {item.productElements.title.title}<img src={item.productElements.image.imgUrl} alt="" />
              {item.productElements.price.sell_price.formatedAmount}
              <a href={item.action}>Перейти на товар</a>
            </li>;
          }) : null
          }
        </ul> */}
      </>
    );
  }
}
