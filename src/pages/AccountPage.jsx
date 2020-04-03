import React, { Component } from 'react'
import { connect } from 'react-redux';
import foto from '../images/logo.png'
import Presents from '../components/Presents/Presents';
const userName = 'Авоськиин Иван Ашанович'
const userInfo = 'I am a very simple card. I am good at containing small bits of information.I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.';


class AccountPage extends Component {

    state = {
        edit: false
    }

    editUserInfo = () => {
        this.setState({
            edit: !this.state.edit
        })
    }


    render() {
        return (
            <div>
                <div className="row">
                    {/* userFoto */}
                    <div className="col s4">
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light">
                                <img className="activator" src={foto} alt=''/>
                            </div>
                            <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">About me</span>
                                <p><a href="/about">This is a link</a></p>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">About me<i className="material-icons right">close</i>
                                </span>
                                <p>Here is some more information about this product that is only revealed once clicked on.</p>
                            </div>
                        </div>
                    </div>
                    {/* userInfo */}
                    <div className="col s6">
                        <div className="card-panel teal">
                            <span className="white-text">
                                <h3>{userName}</h3>
                                {userInfo}
                            </span>
                        </div>
                    </div>
                    {/* Edit  */}
                    <div className="col s2">
                        <button className="btn" onClick={() => this.editUserInfo()}>
                            EDIT
                    </button>
                    </div>
                </div>
                <div>
                    {/* Hashtags */}
                    {this.props.accountHeshtegs.length ? 
                    this.props.accountHeshtegs.map(tag => {
                        return (
                            <div className="chip">
                                <a href="/user/tags">
                                    {tag}
                                </a>
                            </div>
                        )
                    }) : <></>
                    }
                </div>
                {/* Edit USer Form */}
                {this.state.edit ? <div>
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="first_name" type="text" className="validate" />
                                <label for="first_name">Фамилия</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="last_name" type="text" className="validate" />
                                <label for="last_name">Имя</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="middle_name" type="text" className="validate" />
                                <label for="middle_name">Отчество</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="about_user" type="text" className="validate" />
                                <label for="about_user">Обо мне</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="email" type="email" className="validate" />
                                <label for="email">Email</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="password" type="password" className="validate" />
                                <label for="password">Password</label>
                            </div>
                        </div>
                    </form>
                </div> : null}
                <Presents />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    accountHeshtegs: state.accountHeshtegs,
  };
};

export default connect(mapStateToProps)(AccountPage);
