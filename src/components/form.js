import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dispatchCotation } from '../actions';

class Form extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  onClick() {
    const { addCotationDispatch } = this.props;

    addCotationDispatch(this.state);

    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      description: '',
    }));
  }

  onChange({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            name="value"
            id="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.onChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            value={ description }
            id="description"
            data-testid="description-input"
            onChange={ this.onChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            value={ currency }
            id="currency"
            onChange={ this.onChange }
          >
            { currencies.map((curr) => <option key={ curr }>{ curr }</option>) }
          </select>
        </label>
        <label htmlFor="method">
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ this.onChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.onChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.onClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addCotationDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addCotationDispatch: (value) => dispatch(dispatchCotation(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
