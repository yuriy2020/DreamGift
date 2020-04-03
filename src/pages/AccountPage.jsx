import React, { Component } from 'react'
import { connect } from 'react-redux';
import foto from '../images/logo.png'
const userName = 'Авоськиин Иван Ашанович'

const hashtags = ['лопата', 'аптека', 'хештеги']

class AccountPage extends Component {

    state = {
        edit: false,
        userFamilyName: "Avoskin",
        userName: "Ivan",
        userMiddleName: "Ashan",
        userEmail: "",
        userInfo: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos aspernatur cumque animi cu"
    }

    editUserInfo = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    changeUserInfo = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        return (
            <div>
                <div className="row">
                    {/* userFoto */}
                    <div className="col s5">
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light">
                                <img className="activator" src={foto} alt='' />
                            </div>
                            <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">{this.state.userName}</span>
                                <p><a href="/about">More info...</a></p>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">{this.state.userInfo}<i className="material-icons right">close</i>
                                </span>
                                <p>{this.state.userInfo}</p>

                            </div>
                        </div>
                    </div>
                    {/* userInfo */}
                    <div className="col s6">
                        <div className="card-panel teal">
                            <span className="white-text">
                                <h4>{this.state.userName} {this.state.userMiddleName} {this.state.userFamilyName}</h4>
                                <p>Email: {this.state.userEmail}</p>
                                <hr />
                                <p>{this.state.userInfo}</p>
                            </span>
                        </div>
                    </div>
                    {/* Edit  */}
                    <div className="col s1">
                        <button className="waves-effect waves-light btn-large" onClick={() => this.editUserInfo()}>
                            <i class="material-icons">brush</i>
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
                {/* Edit User Form */}
                {this.state.edit ? <div>
                    {console.log(this.props)}
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="first_name" type="text" className="validate" name="userFamilyName"
                                    onChange={(event) => this.changeUserInfo(event)} />
                                <label for="first_name">Фамилия</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="last_name" type="text" className="validate" name="userName"
                                    onChange={(event) => this.changeUserInfo(event)} />
                                <label for="last_name">Имя</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="middle_name" type="text" className="validate" name="userMiddleName"
                                    onChange={(event) => this.changeUserInfo(event)} />
                                <label for="middle_name">Отчество</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="about_user" type="text" className="validate" name="userInfo"
                                    onChange={(event) => this.changeUserInfo(event)} />
                                <label for="about_user">Обо мне</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="email" type="email" className="validate" name="userEmail"
                                    onChange={(event) => this.changeUserInfo(event)} />
                                <label for="email">Email</label>
                            </div>
                            <div className="input-field col s5">
                                <input id="password" type="password" className="validate" name="userPassword"
                                    onChange={(event) => this.changeUserInfo(event)} />
                                <label for="password">Password</label>
                            </div>
                        </div>
                    </form>
                </div> : null}
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
