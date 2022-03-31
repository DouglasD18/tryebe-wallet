import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addEmailValue } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.formValidation = this.formValidation.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validationEmail = this.validationEmail.bind(this);

    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
  }

  onChange({ target: { name, value } }) {
    this.setState(
      { [name]: value },
      this.formValidation,
    );
  }

  onSubmit() {
    const { email } = this.state;
    const { add } = this.props;

    this.setState({ email });

    add(email);
  }

  validationEmail(value) {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(mailformat)) {
      return true;
    }
  }

  formValidation() {
    const { email, password } = this.state;
    const emailValid = this.validationEmail(email);
    const MIN = 6;

    if (emailValid && password.length >= MIN) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  render() {
    const { email, password, isDisable } = this.state;

    return (
      <form>
        <input
          type="text"
          data-testid="email-input"
          value={ email }
          name="email"
          onChange={ this.onChange }
          placeholder="Email"
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          name="password"
          onChange={ this.onChange }
          placeholder="Password"
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ isDisable }
            onClick={ this.onSubmit }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  add: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add: (value) => dispatch(addEmailValue(value)),
});

export default connect(null, mapDispatchToProps)(Login);
