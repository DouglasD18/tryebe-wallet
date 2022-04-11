import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dispatchCotation, edit, toEditExpenses } from '../actions';

class Form extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.addButton = this.addButton.bind(this);
    this.editButton = this.editButton.bind(this);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  onClickAdd() {
    const { addCotationDispatch } = this.props;

    addCotationDispatch(this.state);

    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      description: '',
    }));
  }

  onClickEdit() {
    const { turnFalse, toEdit, expenses, sendEdited, idNumber } = this.props;

    sendEdited(this.state, expenses, idNumber);
    turnFalse(toEdit);

    this.setState({
      value: '',
      description: '',
    });
  }

  onChange({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  addButton() {
    return (
      <button
        type="button"
        onClick={ this.onClickAdd }
      >
        Adicionar despesa
      </button>);
  }

  editButton() {
    return (
      <button
        type="button"
        onClick={ this.onClickEdit }
      >
        Editar despesa
      </button>);
  }

  render() {
    const { currencies, toEdit } = this.props;
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
            data-testid="currency-input"
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
        { toEdit ? this.editButton() : this.addButton() }
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addCotationDispatch: PropTypes.func.isRequired,
  toEdit: PropTypes.bool.isRequired,
  turnFalse: PropTypes.func.isRequired,
  sendEdited: PropTypes.func.isRequired,
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
  idNumber: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  toEdit: state.edit.verify,
  expenses: state.wallet.expenses,
  idNumber: state.edit.id,
});

const mapDispatchToProps = (dispatch) => ({
  addCotationDispatch: (value) => dispatch(dispatchCotation(value)),
  turnFalse: (state) => dispatch(edit(state)),
  sendEdited: (state, expenses, id) => dispatch(toEditExpenses(state, expenses, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
