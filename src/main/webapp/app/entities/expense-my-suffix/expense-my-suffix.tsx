import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  openFile,
  byteSize,
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './expense-my-suffix.reducer';
import { IExpenseMySuffix } from 'app/shared/model/expense-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IExpenseMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IExpenseMySuffixState = IPaginationBaseState;

export class ExpenseMySuffix extends React.Component<IExpenseMySuffixProps, IExpenseMySuffixState> {
  state: IExpenseMySuffixState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { expenseList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="expense-my-suffix-heading">
          <Translate contentKey="risingArjunApp.expense.home.title">Expenses</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.expense.home.createLabel">Create new Expense</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {expenseList && expenseList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('item')}>
                    <Translate contentKey="risingArjunApp.expense.item">Item</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('quantity')}>
                    <Translate contentKey="risingArjunApp.expense.quantity">Quantity</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('rate')}>
                    <Translate contentKey="risingArjunApp.expense.rate">Rate</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('laborCost')}>
                    <Translate contentKey="risingArjunApp.expense.laborCost">Labor Cost</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('otherExpense')}>
                    <Translate contentKey="risingArjunApp.expense.otherExpense">Other Expense</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('total')}>
                    <Translate contentKey="risingArjunApp.expense.total">Total</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('date')}>
                    <Translate contentKey="risingArjunApp.expense.date">Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('transactionId')}>
                    <Translate contentKey="risingArjunApp.expense.transactionId">Transaction Id</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('expenseMode')}>
                    <Translate contentKey="risingArjunApp.expense.expenseMode">Expense Mode</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('type')}>
                    <Translate contentKey="risingArjunApp.expense.type">Type</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('bill')}>
                    <Translate contentKey="risingArjunApp.expense.bill">Bill</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('remarks')}>
                    <Translate contentKey="risingArjunApp.expense.remarks">Remarks</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.expense.enterprise">Enterprise</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.expense.incurredBy">Incurred By</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {expenseList.map((expense, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${expense.id}`} color="link" size="sm">
                        {expense.id}
                      </Button>
                    </td>
                    <td>{expense.item}</td>
                    <td>{expense.quantity}</td>
                    <td>{expense.rate}</td>
                    <td>{expense.laborCost}</td>
                    <td>{expense.otherExpense}</td>
                    <td>{expense.total}</td>
                    <td>
                      <TextFormat type="date" value={expense.date} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{expense.transactionId}</td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Mode.${expense.expenseMode}`} />
                    </td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Expensetype.${expense.type}`} />
                    </td>
                    <td>
                      {expense.bill ? (
                        <div>
                          <a onClick={openFile(expense.billContentType, expense.bill)}>
                            <img src={`data:${expense.billContentType};base64,${expense.bill}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                            {expense.billContentType}, {byteSize(expense.bill)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{expense.remarks}</td>
                    <td>
                      {expense.enterpriseEnterprisename ? (
                        <Link to={`enterprise-my-suffix/${expense.enterpriseId}`}>{expense.enterpriseEnterprisename}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {expense.incurredByEmployeeId ? (
                        <Link to={`employee-my-suffix/${expense.incurredById}`}>{expense.incurredByEmployeeId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${expense.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${expense.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${expense.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="risingArjunApp.expense.home.notFound">No Expenses found</Translate>
            </div>
          )}
        </div>
        <div className={expenseList && expenseList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ expense }: IRootState) => ({
  expenseList: expense.entities,
  totalItems: expense.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseMySuffix);
