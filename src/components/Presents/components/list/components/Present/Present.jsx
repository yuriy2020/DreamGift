import React from 'react';
import './Present.css';
import { connect } from 'react-redux';
import { changePresent } from '../../../../../../redux/actions';

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      change: false,
      newName: '',
      newHref: '',
      message: ""
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  changeName = () => {
    this.setState({
      change: true
    })
  };

  returnList = () => {
    this.setState({
      change: false
    })
  }

  async givePresent(id) {
    const givePresent = this.props.presents.slice();
    givePresent.map((item) => {
      if (item.status === false) {
        item.status = true
      };
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

  async deletePresent(id) {
    const newPresents = this.props.presents.filter((item) => item.id !== id);
    await this.props.changePresent(newPresents);
    await fetch('/savepresents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ presents: newPresents, login: this.props.login })
    });
    localStorage.setItem('presents', JSON.stringify(newPresents));
  
  };

  async changePresent(oldName, newName) {
    const newPresents = this.props.presents.slice();
    newPresents.map((item) => {
      if (item.value === oldName) {
        item.value = newName
      };
      if (item.href === oldName) {
        item.href = newName
      }
    });
    this.props.changePresent(newPresents);
    await fetch('/savepresents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ presents: newPresents, login: this.props.login })
    });
    localStorage.setItem('presents', JSON.stringify(this.props.presents));
  }

  render() {
    if (!this.state.change) {
      return (
        <>
          <div className='row'>
            <div className='col s9'>
              <li id={this.props.id} key={this.props.id}>
                {this.props.name} <br></br> <a href={this.props.href}>{this.props.href}</a>
                {this.state.message}
              </li>
            </div>
            <div className='col s1'>
              <button id={this.props.id} onClick={() => { return this.givePresent(this.props.id) }} className='btn-small'>
              <i class="small material-icons">done</i>
              </button>
            </div>
            <div className='col s1'>
              <button id={this.props.id} onClick={() => { return this.changeName() }} className='btn-small'>
                <i class="small material-icons">create</i>
              </button>
            </div>
            <div className='col s1'>
              <button id={this.props.id} onClick={() => { return this.deletePresent(this.props.id) }}
                className='btn-small'><i class="small material-icons">delete</i>

              </button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <li id={this.props.id} key={this.props.id}>
          </li>
          <input type="text" name='newName' onChange={this.handleChange} placeholder={this.props.name} />
          <input type="text" name='newHref' onChange={this.handleChange} placeholder={this.props.href} />
          <button id={this.props.id} onClick={() => { this.changePresent(this.props.name, this.state.newName); this.changePresent(this.props.href, this.state.newHref); this.returnList() }}>
            Сохранить
          </button>
        </>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePresent: (payload) => dispatch(changePresent(payload)),
  };
};

const mapStateToProps = (state) => {
  return {
    presents: state.presents,
    login: state.login
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
