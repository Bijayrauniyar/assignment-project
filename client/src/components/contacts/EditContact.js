import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import { getContact, updateContact } from '../../actions/contactActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextstate) {
    const { name, email, phone } = nextProps.contact;

    this.setState({
      name,
      email,
      phone
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getContact(id);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;
    // Check For Errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    const updateContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;

    //// UPDATE CONTACT ////
    this.props.updateContact(id, updateContact);

    // Clear State
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/contacts');
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;
    console.log(name, email);
    return (
      <div className="card mb-3">
        <div className="card-header">Edit Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Phone"
              name="phone"
              placeholder="Enter Phone"
              value={phone}
              onChange={this.onChange}
              error={errors.phone}
            />
            <input
              type="submit"
              value="Update Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contact: state.contact.contact
});

// updateContact.prototype = {
//   updateContact: PropTypes.func.isRequired
// };

EditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { updateContact, getContact }
)(EditContact);
