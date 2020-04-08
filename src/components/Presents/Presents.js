import React from 'react';
import List from './components/list/list';

import { connect } from 'react-redux';
import { savePresent, changePresent } from '../../redux/actions';
import { v4 as uuidv4 } from 'uuid';

class Presents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      present: '',
      href: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  async addPresent() {
    if (this.state.present.length) {
      await this.props.savePresent({ value: this.state.present, id: uuidv4(), href: this.state.href, status: false });
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
  }

  render() {
    return (
      <>
        
        {/* <div className="row">
          <div className='col s5'> */}
            <h5>Wishlist</h5><br></br>
            <input onChange={this.handleChange} value={this.state.present} name="present" type="text" placeholder='название подарка' /><br></br>
            <input onChange={this.handleChange} value={this.state.href} name="href" placeholder='ссылка' />
            <button className="btn-small"
              onClick={() => {
                this.addPresent();
              }}
            >
              Добавить подарок
        </button>
            <List />
          {/* </div> */}
        {/* </div> */}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Presents);
