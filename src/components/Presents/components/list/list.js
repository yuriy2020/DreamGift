import React from 'react';
import Present from './components/Present/Present';
import { connect } from 'react-redux';

class List extends React.Component {
  render() {
    return (
      <ul>
          {this.props.presents && this.props.presents.length ? (
              this.props.presents.map((item) => {
                  return (<>
                      <Present
                          name={item.value} id={item.id} href={item.href}
                      />
                      </>);
              })
          ) : (
              <div></div>
              )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    presents: state.presents
  };
};

export default connect(mapStateToProps)(List);
