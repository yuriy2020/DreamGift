import React from 'react';
import './Modal.css';
import { connect } from 'react-redux';
import { changeModal } from '../../redux/actions';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // answer: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div id="modal">
        <div>
          <span>interests</span>
          <input type="text" onChange={this.handleChange}/>
          <button onClick={this.props.changeModal(false)}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
    
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    changeModal: (payload) => dispatch(changeModal(payload)),
  };
};

export default connect(null, mapDispatchToProps)(Modal);
