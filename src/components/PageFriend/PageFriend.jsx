import React, { Component } from 'react';

class PageFriend extends Component {
  state = {
    friendInfo: '',
    userName: '',
    userFamilyName: '',
    userMiddleName: '',
    userEmail: '',
    userInfo: '',
    userAvatar: '',
  };

  async searchFriend(id) {
    if (id) {
      let url = `/page/${id}`;
      let response = await fetch(url, {
        method: 'GET',
      });
      let result = await response.json();
      this.setState({
        friendInfo: '',
        userName: result.user.userName,
        userFamilyName: result.user.userFamilyName,
        userMiddleName: result.user.userMiddleName,
        userEmail: result.user.userEmail,
        userInfo: result.user.userInfo,
        userAvatar: result.user.userAvatar,
      });
      console.log(result.user.userAvatar);
    }
  }

  componentDidMount() {
    this.searchFriend(this.props.id);
  }

  render() {
    let foto;
    foto = this.state.userAvatar ? this.state.userAvatar : 'http://localhost:5000/images/avatarka.png';
    return (
      <div>

      </div>
      
    //   <div>
    //     <div className="row">
    //       {/* userFoto */}
    //       <div className="col s5">
    //         <div className="card">
    //           <div className="card-image waves-effect waves-block waves-light">
    //             <img
    //               className="activator"
    //               src={foto}
    //               alt="http://localhost:5000/images/present.png"
    //             />
    //           </div>

    //           <div className="card-reveal">
    //             <span className="card-title grey-text text-darken-4">
    //               {this.state.userInfo}
    //               <i className="material-icons right">close</i>
    //             </span>
    //             <p>{this.state.userInfo}</p>
    //           </div>
    //         </div>
    //       </div>
    //       {/* userInfo */}
    //       <div className="col s6">
    //         <div className="card-panel teal">
    //           <span className="white-text">
    //             <h4>
    //               {this.state.userName} {this.state.userMiddleName} {this.state.userFamilyName}
    //             </h4>
    //             <p>Login: {this.props.login}</p>
    //             <p>Email: {this.state.userEmail}</p>
    //             <hr />
    //             <p>{this.state.userInfo}</p>
    //           </span>
    //         </div>
    //       </div>
    //       {/* Edit  */}
    //       <div className="col s1">
    //         <button className="waves-effect waves-light btn" onClick={() => this.toggleUserEdit()}>
    //           <i className="material-icons">brush</i>
    //         </button>
    //       </div>
    //     </div>
    //     <div>
    //       {/* Hashtags */}
    //       {this.props.accountHeshtegs.length ? (
    //         this.props.accountHeshtegs.map((tag) => {
    //           return (
    //             <div className="chip">
    //               <a href={`/user/${tag}`}>{tag}</a>
    //             </div>
    //           );
    //         })
    //       ) : (
    //         <></>
    //       )}
    //       <button
    //         className="waves-effect waves-light btn"
    //         onClick={() => this.props.changeModal(true)}
    //       >
    //         <i className="material-icons">brush</i>
    //       </button>
    //     </div>
    //     {/* Edit User Form */}
    //     {/* <Presents /> */}
    //   </div>
    )
  }
}

export default PageFriend;
