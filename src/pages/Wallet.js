import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { dispatchCurrence } from '../actions';
import Form from '../components/form';
import Table from '../components/table';

class Wallet extends React.Component {
  componentDidMount() {
    const { addCurrencies } = this.props;
    addCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
        <Form />
        <Table />
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
