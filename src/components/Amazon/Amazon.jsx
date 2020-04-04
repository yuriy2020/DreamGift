import React from 'react';


class Amazon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arr: [],
      text: "",
      arrAmazon: undefined
    };
  }

componentDidMount () {
  this.AmazonSearch(this.props.id)
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
    console.log(result);

  }



  render() {
   
    const { text, textAli} = this.state
    return (
      <>
      <div>!!!!!!!!!!!!!!!!!!</div>
      
        <ul>
          {this.state.arrAmazon ? this.state.arrAmazon.map((item, index) => {
            return <li>{item.title}<img src={item.imageUrl} /><a href={item.detailPageURL}>Перейти на Амазон</a></li>;
          }) : null
          }
        </ul>

      </>
    );
  }
}

export default Amazon;
