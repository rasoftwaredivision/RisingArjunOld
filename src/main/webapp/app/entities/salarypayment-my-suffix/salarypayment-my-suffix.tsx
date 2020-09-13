import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './salarypayment-my-suffix.reducer';
import { ISalarypaymentMySuffix } from 'app/shared/model/salarypayment-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ISalarypaymentMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ISalarypaymentMySuffixState = IPaginationBaseState;

export class SalarypaymentMySuffix extends React.Component<ISalarypaymentMySuffixProps, ISalarypaymentMySuffixState> {
  state: ISalarypaymentMySuffixState = {
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
    const { salarypaymentList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="salarypayment-my-suffix-heading">
          <Translate contentKey="risingArjunApp.salarypayment.home.title">Salarypayments</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.salarypayment.home.createLabel">Create new Salarypayment</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {salarypaymentList && salarypaymentList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('salary')}>
                    <Translate contentKey="risingArjunApp.salarypayment.salary">Salary</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('month')}>
                    <Translate contentKey="risingArjunApp.salarypayment.month">Month</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('paid')}>
                    <Translate contentKey="risingArjunApp.salarypayment.paid">Paid</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('unpaid')}>
                    <Translate contentKey="risingArjunApp.salarypayment.unpaid">Unpaid</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('date')}>
                    <Translate contentKey="risingArjunApp.salarypayment.date">Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('transactionId')}>
                    <Translate contentKey="risingArjunApp.salarypayment.transactionId">Transaction Id</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('paymentMode')}>
                    <Translate contentKey="risingArjunApp.salarypayment.paymentMode">Payment Mode</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('remarks')}>
                    <Translate contentKey="risingArjunApp.salarypayment.remarks">Remarks</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.salarypayment.employeeId">Employee Id</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.salarypayment.session">Session</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {salarypaymentList.map((salarypayment, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${salarypayment.id}`} color="link" size="sm">
                        {salarypayment.id}
                      </Button>
                    </td>
                    <td>{salarypayment.salary}</td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Month.${salarypayment.month}`} />
                    </td>
                    <td>{salarypayment.paid}</td>
                    <td>{salarypayment.unpaid}</td>
                    <td>
                      <TextFormat type="date" value={salarypayment.date} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{salarypayment.transactionId}</td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Mode.${salarypayment.paymentMode}`} />
                    </td>
                    <td>{salarypayment.remarks}</td>
                    <td>
                      {salarypayment.employeeIdEmployeeId ? (
                        <Link to={`employee-my-suffix/${salarypayment.employeeIdId}`}>{salarypayment.employeeIdEmployeeId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {salarypayment.sessionAcadSessionId ? (
                        <Link to={`academicsession-my-suffix/${salarypayment.sessionId}`}>{salarypayment.sessionAcadSessionId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${salarypayment.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${salarypayment.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${salarypayment.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.salarypayment.home.notFound">No Salarypayments found</Translate>
            </div>
          )}
        </div>
        <div className={salarypaymentList && salarypaymentList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ salarypayment }: IRootState) => ({
  salarypaymentList: salarypayment.entities,
  totalItems: salarypayment.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalarypaymentMySuffix);
