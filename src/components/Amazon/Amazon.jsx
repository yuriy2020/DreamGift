import React from 'react';
import { connect } from 'react-redux';
import { savePresent, changePresent } from '../../redux/actions';
import { v4 as uuidv4 } from 'uuid';

class Amazon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arr: [],
      text: "",
      arrAmazon: [],
      present: '',
      href: ''
    };
  }


  componentDidMount() {
    this.AmazonSearch(this.props.id);
    const presents = localStorage.getItem('presents');
    this.props.changePresent(JSON.parse(presents));
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


  async addPresent(titlePresent, urlPresent) {

    await this.props.savePresent({ value: titlePresent, id: uuidv4(), href: urlPresent });
    await fetch('/savepresents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ presents: this.props.presents, login: this.props.login })
    });
    this.setState({
      present: '',
      href: ''
    });
    localStorage.setItem('presents', JSON.stringify(this.props.presents));

  }

  render() {

    return (
      <div className="row">
        {this.state.arrAmazon.length ? this.state.arrAmazon.map((item, index) => {
          return (
            <div className="col s3" style={{ marginTop: 10 }}>
              <a href={item.detailPageURL} target='blank' title="Перейти на Amazon">
                <img src={item.imageUrl} alt='img'/>
              </a>
              <p className='truncate'>{item.title}</p>
              <button className="btn-small waves-effect waves-light" onClick={() => { this.addPresent(item.title, item.detailPageURL) }}>Добавить в мои подарки</button>
            </div>
          )
        }) : null
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    savePresent: (payload) => dispatch(savePresent(payload)),
    changePresent: (payload) => dispatch(changePresent(payload))
  };
};

const mapStateToProps = (state) => {
  return {
    presents: state.presents,
    login: state.login
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Amazon);
