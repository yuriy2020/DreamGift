import React, { Component } from 'react'
import { connect } from 'react-redux';
import {changeModal} from '../../redux/actions'

class Hashtags extends Component {
    render() {
        return (
            <div>
                <div>
                    {/* Hashtags */}
                    {this.props.accountHeshtegs && this.props.accountHeshtegs.length ? (
                        this.props.accountHeshtegs.map((tag) => {
                            return (
                                <div className="chip">
                                    <a href={`/user/${tag}`}>{tag}</a>
                                </div>
                            );
                        })
                    ) : (
                            <></>
                        )}
                    <button
                        className="waves-effect waves-light btn "
                        onClick={() => this.props.changeModal(true)}
                    >
                        <i className="material-icons">brush</i>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      accountHeshtegs: state.accountHeshtegs,
     
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
     
      changeModal: (payload) => dispatch(changeModal(payload)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Hashtags);
  