import React, { Component } from 'react';


class PageFriend extends Component {
  state = {
    isAvatar: '',
    edit: false,
    userName: undefined,
    userFamilyName: undefined,
    userMiddleName: undefined,
    userEmail: undefined,
    userInfo: undefined,
    userAvatar: undefined,
  };

  async searchFriend(id) {
    if(id) {
      let url = `/page/${id}`
      let response = await fetch(url, {
        method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({ login: id })
      })
  
      let result = await response.json();
      this.setState({
        isAvatar: '',
        edit: false,
        userName: result.userName,
        userFamilyName: result.userFamilyName,
        userMiddleName: result.userMiddleName,
        userEmail: result.userEmail,
        userInfo: result.userInfo,
        userAvatar: result.userAvatar,
      })
      console.log(result);
    }
  }

  componentDidMount() {
    this.searchFriend(this.props.id)
    }
  
    
    
    



  render() {
    return (
      <>
      <div>azaza</div>

      <div className="row">
          {/* userFoto */}
          <div className="col s6">
            <div className="card">
              {/* <div className="card-image waves-effect waves-block waves-light img_crop">
                <img
                  className="activator"
                  src={foto}
                  alt="http://localhost:5000/images/present.png"
                />
              </div> */}
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  {this.props.userName}
                </span>

                {/* <UserFoto /> */}
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
                <p>Login: {this.props.login}</p>
                <p>Email: {this.props.userEmail}</p>
                <hr />
                <p>{this.props.userInfo}</p>
              </span>

 {/* Edit icon  */}
            
              <button className="waves-effect waves-light btn teal darken-4 " onClick={() => this.toggleUserEdit()}>
                <i className="material-icons">brush</i>
              </button>
          
            </div>

          </div>

          <div className="col s6">
            {/* <Presents /> */}
          </div>
          <div className='col s1'>

           

          </div>

        </div>
      
     
      </>
    )}
}



export default PageFriend;
