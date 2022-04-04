import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { expenses, email } = this.props;

    const principal = expenses.map((expense) => {
      const currencyName = expense.currency;

      const values = {
        value: Number(expense.value),
        exchangeValue: Number(expense.exchangeRates[currencyName].ask),
      };

      return values;
    });

    const correctsValues = principal.map((e) => e.value * e.exchangeValue);
    const total = correctsValues.reduce((prev, curr) => prev + curr, 0);

    return (
      <header>
        <p data-testid="email-field">
          {`Email: ${email}`}
        </p>
        <p data-testid="total-field">
          { `${total.toFixed(2)}` }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      description: '',
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      exchangeRates: PropTypes.objectOf(
        PropTypes.objectOf(PropTypes.string),
      ),
    }),
  ).isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
