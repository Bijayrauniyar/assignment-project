import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
class Header extends Component {
  async login() {
    await window.open('http://localhost:8000/auth', 'self');
  }

  async logout() {
    await this.props.logout();
  }

  render() {
    const { branding } = this.props;
    const { isAuthenticated } = this.props.auth;

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {branding}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar1">
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className=" collapse navbar-collapse "
            style={{
              flexGrow: '0'
            }}
            id="navbar1">
            <ul className="navbar-nav ">
              {isAuthenticated ? (
                <React.Fragment>
                  <li className="nav-item">
                    <Link to="/contacts" className="nav-link">
                      <i className="fas fa-address-book" /> Contacts
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/contact/add" className="nav-link">
                      <i className="fas fa-plus" /> Add
                    </Link>
                  </li>

                  <li onClick={this.logout.bind(this)} className="nav-item">
                    <Link to="#" className="nav-link">
                      <i className="fas fa-sign-out-alt " /> Logout
                    </Link>
                  </li>
                </React.Fragment>
              ) : (
                <li onClick={this.login.bind(this)} className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="fas fa-sign-in-alt " /> Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  branding: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
