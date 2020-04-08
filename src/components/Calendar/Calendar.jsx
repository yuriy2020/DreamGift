import React, { Component } from 'react'
import Calendar from 'react-calendar';  
import 'react-calendar/dist/Calendar.css';
import { connect } from 'react-redux';

import {userDates} from '../../redux/actions'

class UserCalendar extends Component {
    state = {
        date: new Date(),
    }

    
    onChange = date => {
        // this.setState({ date })
        console.log('date',date.getDate())
        console.log('Month',date.getMonth())
        console.log('Year',date.getYear())
        


    }
    render() {
        return (
            <div>
                <blockquote>
                    <strong>
                        Здесь будут знаменательные даты
                    </strong>
                </blockquote>   
               
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                   
                />
            </div>
        )
    }
}   

const mapStateToProps = (state) => {
    return {
      userDates: state.userDates
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
     
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserCalendar);