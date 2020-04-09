import React from 'react';
import './Modal.css';
import { connect } from 'react-redux';
import { changeModal, addHeshtegs } from '../../redux/actions';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heshtegs: ['toothbrush', 'dron', 'pillow', 'laptop', 'headphones', 'игрушки'],
      other: ''
    };
  }

  saveHeshtegs = async (event) => {
    const activeHeshtegs = event.target.previousElementSibling.firstChild.children;
    const other = this.state.other.split(/\s/);
    const hesh = this.state.other.length ? [...other] : [];
    for (let i = 0; i < activeHeshtegs.length; i++) {
      if (activeHeshtegs[i].className === 'btn') {
        hesh.push(activeHeshtegs[i].value);
      } 
    }
    this.props.addHeshtegs(hesh);
    localStorage.setItem('heshtegs', hesh);
    this.props.changeModal(false);
    await fetch('/savetegs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({
        heshtegs: hesh, login: this.props.login
      })
    });
  };

  changeStatus = (event) => {
    if (event.target.className === 'btn blue lighten-3') {
      event.target.className = 'btn';
    } else {
      event.target.className = 'btn blue lighten-3';
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div id="modalWindow" className='modalWindow'>
        <span>Добавь свои интересы</span>
        <div>
          <div>
            {this.state.heshtegs.map((item) => (
              <button className="btn blue lighten-3" onClick={this.changeStatus} value={item}>
                {item}
              </button>
            ))}
          </div>
          <input type="text" onChange={this.handleChange} placeholder="other" name="other" />
        </div>
        <button className="btn-small" onClick={this.saveHeshtegs}>Сохранить</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  login: state.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeModal: (payload) => dispatch(changeModal(payload)),
    addHeshtegs: (payload) => dispatch(addHeshtegs(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
