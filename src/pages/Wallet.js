import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import { dispatchCurrence } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { addCurrencies } = this.props;
    addCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

Wallet.propTypes = {
  addCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addCurrencies: () => dispatch(dispatchCurrence()),
});

export default connect(null, mapDispatchToProps)(Wallet);
