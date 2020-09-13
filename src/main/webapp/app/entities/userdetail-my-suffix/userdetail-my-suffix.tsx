import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './userdetail-my-suffix.reducer';
import { IUserdetailMySuffix } from 'app/shared/model/userdetail-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IUserdetailMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IUserdetailMySuffixState = IPaginationBaseState;

export class UserdetailMySuffix extends React.Component<IUserdetailMySuffixProps, IUserdetailMySuffixState> {
  state: IUserdetailMySuffixState = {
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
    const { userdetailList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="userdetail-my-suffix-heading">
          <Translate contentKey="risingArjunApp.userdetail.home.title">Userdetails</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.userdetail.home.createLabel">Create new Userdetail</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {userdetailList && userdetailList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('mobileNo')}>
                    <Translate contentKey="risingArjunApp.userdetail.mobileNo">Mobile No</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('dob')}>
                    <Translate contentKey="risingArjunApp.userdetail.dob">Dob</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('houseNo')}>
                    <Translate contentKey="risingArjunApp.userdetail.houseNo">House No</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('street')}>
                    <Translate contentKey="risingArjunApp.userdetail.street">Street</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('city')}>
                    <Translate contentKey="risingArjunApp.userdetail.city">City</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('state')}>
                    <Translate contentKey="risingArjunApp.userdetail.state">State</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('country')}>
                    <Translate contentKey="risingArjunApp.userdetail.country">Country</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('pincode')}>
                    <Translate contentKey="risingArjunApp.userdetail.pincode">Pincode</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.userdetail.user">User</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.userdetail.enterprise">Enterprise</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {userdetailList.map((userdetail, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${userdetail.id}`} color="link" size="sm">
                        {userdetail.id}
                      </Button>
                    </td>
                    <td>{userdetail.mobileNo}</td>
                    <td>
                      <TextFormat type="date" value={userdetail.dob} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{userdetail.houseNo}</td>
                    <td>{userdetail.street}</td>
                    <td>
                      <Translate contentKey={`risingArjunApp.City.${userdetail.city}`} />
                    </td>
                    <td>
                      <Translate contentKey={`risingArjunApp.State.${userdetail.state}`} />
                    </td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Country.${userdetail.country}`} />
                    </td>
                    <td>{userdetail.pincode}</td>
                    <td>{userdetail.userLogin ? userdetail.userLogin : ''}</td>
                    <td>
                      {userdetail.enterpriseEnterprisename ? (
                        <Link to={`enterprise-my-suffix/${userdetail.enterpriseId}`}>{userdetail.enterpriseEnterprisename}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${userdetail.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${userdetail.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${userdetail.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.userdetail.home.notFound">No Userdetails found</Translate>
            </div>
          )}
        </div>
        <div className={userdetailList && userdetailList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ userdetail }: IRootState) => ({
  userdetailList: userdetail.entities,
  totalItems: userdetail.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserdetailMySuffix);
