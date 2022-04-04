import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
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
        <td>Editar/Excluir</td>
      </tr>
    );
  }

  createTable() {
    const { expenses } = this.props;

    return (
      <>
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
      </>
    );
  }

  // Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido, Moeda de conversão e Editar/Excluir.

  render() {
    const { expenses } = this.props;

    return (
      <>
        <h3>Tabela de despesas</h3>
        { expenses.length > 0 ? this.createTable() : <p>Sem despesa</p> }
      </>
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
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
