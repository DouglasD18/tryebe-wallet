import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="despesa">
          Valor:
          <input
            id="despesa"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select
            id="moeda"
          >
            { currencies.map((curr) => <option key={ curr }>{ curr }</option>) }
          </select>
        </label>
        <label htmlFor="metodo">
          <select data-testid="method-input" id="metodo">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select data-testid="tag-input" id="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Form);
