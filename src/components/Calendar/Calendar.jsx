import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './Calendar.css';
import { connect } from 'react-redux';
import { userDates } from '../../redux/actions';

const birthdayStyle = `.DayPicker-Day--highlighted {
  background-color: grey;
  color: white;
}`;

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      message: 'Please select a day.',
      birthday: undefined,
      dates: [],
    };
  }

  componentDidMount() {
    const login = localStorage.getItem('login');
    if (login) {
      const friends = localStorage.getItem('friends');
      const all = JSON.parse(localStorage.getItem('allUsers'));
      const obj = {};
      const userObj = {};
      if (friends && all) {
        const friendsBirthdays = all.filter(
          (item) => friends.includes(item.login) && item.userBirthdate
        );
        if (this.props.userBirthdate) {
          userObj.login = this.props.login;
          userObj.userBirthdate = this.props.userBirthdate;
          friendsBirthdays.push(userObj);
        }
        const dates = friendsBirthdays.map((item) => {
          const year = new Date().getFullYear();
          const month = new Date(item.userBirthdate).getMonth();
          const day = new Date(item.userBirthdate).getDate();
          obj[item.login] = new Date(year, month, day);
          return new Date(year, month, day);
        });
        localStorage.setItem('friendsWithBirthdays', JSON.stringify(obj));
        this.props.getUserDates({ userDates: dates, dates: obj });
      }
    }
  }

  handleDayClick(day) {
    if (this.props.userDates.dates) {
      const entries = Object.entries(this.props.userDates.dates);
      for (const [key, value] of entries) {
        if (key === this.props.login && new Date(value).toDateString() === day.toDateString()) {
          this.setState({
            birthday: undefined,
            message: 'Сегодня твой день рождения! Поздравляем!',
          });
          return;
        }
        if (new Date(value).toDateString() === day.toDateString()) {
          this.setState({
            birthday: key,
          });
          return;
        } else {
          this.setState({
            birthday: undefined,
            message: 'Никаких событий в этот день',
          });
        }
      }
    }
  }

  render() {
    let modifiers;
    if (this.props.userDates.userDates) {
      modifiers = {
        highlighted: this.props.userDates.userDates,
      };
    }

    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    return (
      <div className="calendar">
        <h5>Не пропусти дни рождения своих друзей!</h5>
        <style>{birthdayStyle}</style>
        <DayPicker
          modifiers={modifiers}
          month={new Date(year, month)}
          onDayClick={this.handleDayClick}
        />
        {this.state.birthday ? (
          <>
            <p>У твоего друга сегодня день рождения!</p>
            <p>
              Не забудь поздравить
              <a href={`/page/${this.state.birthday}`}>{this.state.birthday}</a>
            </p>
          </>
        ) : (
          <p>{this.state.message}</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDates: state.userDates,
    login: state.login,
    userBirthdate: state.userBirthdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDates: (payload) => dispatch(userDates(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
