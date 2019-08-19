import React from 'react';
import { connect } from 'react-redux';
import { loginSuccess } from '../../actions/authActions';

class Home extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <h1 className="display-4">Welocome to Contact Manager</h1>
        <p className="lead">Simple app to manage contacts</p>
        <p className="text-secondary">Version 1.0.0</p>

        <div>
          {!isAuthenticated ? (
            <h1>Welcome!</h1>
          ) : (
            <div>
              <h1>You have login succcessfully!</h1>
              <h2>Welcome {this.props.auth.user.name}!</h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    loginSuccess
  }
)(Home);
