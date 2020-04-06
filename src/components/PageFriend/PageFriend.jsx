import React, { Component } from 'react';


class PageFriend extends Component {
  state = {
    friendInfo: undefined,
    isAvatar: '',
    edit: false,
    userName: this.props.userName,
    userFamilyName: this.props.userFamilyName,
    userMiddleName: this.props.userMiddleName,
    userEmail: this.props.userEmail,
    userInfo: this.props.userInfo,
    userAvatar: this.props.userAvatar,
  };

  componentDidMount() {
    this.searchFriend(this.props.id)
    }
  
    async searchFriend(id) {
      if(id) {
        let url = `/page//${id}`
        let response = await fetch(url, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "ali-express1.p.rapidapi.com",
            "x-rapidapi-key": "5034190542mshce3429305e9c4d0p1c67f2jsn699c5a3523b3"
          }
        })
    
        let result = await response.json();
        this.setState({
          friendInfo: result
        })
        console.log(result);
      }
    
    }



  render() {
   
    return (
      <div>
        <div className="row">
          {/* userFoto */}
          <div className="col s5">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img
                  className="activator"
                  src={foto}
                  alt="http://localhost:5000/images/present.png"
                />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  {this.props.userName}
                </span>

                <UserFoto />
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  {this.props.userInfo}
                  <i className="material-icons right">close</i>
                </span>
                <p>{this.props.userInfo}</p>
              </div>
            </div>
          </div>
          {/* userInfo */}
          <div className="col s6">
            <div className="card-panel teal">
              <span className="white-text">
                <h4>
                  {this.props.userName} {this.props.userMiddleName} {this.props.userFamilyName}
                </h4>
                <p>Login: {login}</p>
                <p>Email: {this.props.userEmail}</p>
                <hr />
                <p>{this.props.userInfo}</p>
              </span>
            </div>
          </div>
          {/* Edit  */}
          <div className="col s1">
            <button className="waves-effect waves-light btn" onClick={() => this.toggleUserEdit()}>
              <i className="material-icons">brush</i>
            </button>
          </div>
        </div>
        <div>
          {/* Hashtags */}
          {this.props.accountHeshtegs.length ? (
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
            className="waves-effect waves-light btn"
            onClick={() => this.props.changeModal(true)}
          >
            <i className="material-icons">brush</i>
          </button>
        </div>
        {/* Edit User Form */}
        <Presents />
      </div>
    );
  }
}



export default PageFriend;
