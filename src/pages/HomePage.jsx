import React from 'react';
import Friends from '../components/friends/friends';
import Calendar from '../components/Calendar/Calendar';
import './css/HomePage.css';
import { connect } from 'react-redux';

class HomePage extends React.Component {
  render() {
    if (!this.props.auth) {
      return (
        <div className="background">
          <div className="opacity"></div>
        </div>
      );
    }
    return (
      <div className="background">
        <div className="opacity">
          <div className="row">
            <div className="col s6">
              <Friends />
            </div>
            <div className="col s6 push-s1">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(HomePage);
