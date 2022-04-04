import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { excludExpense } from '../actions';

class Table extends React.Component {
  toExclude(param) {
    const { expenses, excluded } = this.props;

    const filtered = expenses.filter((e) => e.id !== param);
    excluded(filtered);
  }

  addInfos(expense) {
    const {
      currency,
      tag,
      description,
      value,
      method,
      exchangeRates,
      id,
    } = expense;
    const factor = exchangeRates[currency].ask;
    const valueConverted = Number(value * factor);
    const name = exchangeRates[currency].name.split('/', 1);

    return (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ Number(value).toFixed(2) }</td>
        <td>
          { currency === 'USD'
            ? 'Dólar Comercial'
            : name }
        </td>
        <td>{ Number(factor).toFixed(2) }</td>
        <td>{ valueConverted.toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button type="button">
            Editar
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.toExclude(id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }

  createTable() {
    const { expenses } = this.props;

    return (
      <tbody>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        { expenses.map((e) => (this.addInfos(e)))}
      </tbody>
    );
  }

  render() {
    const { expenses } = this.props;

    return (
      <main>
        <h3>Tabela de despesas</h3>
        <table>
          { expenses.length > 0 ? this.createTable() : <p>Sem despesa</p> }
        </table>
      </main>
    );
  }
}

Table.propTypes = {
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
  excluded: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  excluded: (state) => dispatch(excludExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
