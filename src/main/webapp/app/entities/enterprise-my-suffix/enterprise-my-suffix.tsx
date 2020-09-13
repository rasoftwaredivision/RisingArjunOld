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
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './enterprise-my-suffix.reducer';
import { IEnterpriseMySuffix } from 'app/shared/model/enterprise-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IEnterpriseMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IEnterpriseMySuffixState = IPaginationBaseState;

export class EnterpriseMySuffix extends React.Component<IEnterpriseMySuffixProps, IEnterpriseMySuffixState> {
  state: IEnterpriseMySuffixState = {
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
    const { enterpriseList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="enterprise-my-suffix-heading">
          <Translate contentKey="risingArjunApp.enterprise.home.title">Enterprises</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.enterprise.home.createLabel">Create new Enterprise</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {enterpriseList && enterpriseList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('abbrevation')}>
                    <Translate contentKey="risingArjunApp.enterprise.abbrevation">Abbrevation</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('enterprisename')}>
                    <Translate contentKey="risingArjunApp.enterprise.enterprisename">Enterprisename</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('natureofbusiness')}>
                    <Translate contentKey="risingArjunApp.enterprise.natureofbusiness">Natureofbusiness</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('logo')}>
                    <Translate contentKey="risingArjunApp.enterprise.logo">Logo</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('punchline')}>
                    <Translate contentKey="risingArjunApp.enterprise.punchline">Punchline</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('mission')}>
                    <Translate contentKey="risingArjunApp.enterprise.mission">Mission</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('vision')}>
                    <Translate contentKey="risingArjunApp.enterprise.vision">Vision</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('principles')}>
                    <Translate contentKey="risingArjunApp.enterprise.principles">Principles</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('email')}>
                    <Translate contentKey="risingArjunApp.enterprise.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('mobile')}>
                    <Translate contentKey="risingArjunApp.enterprise.mobile">Mobile</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('landline')}>
                    <Translate contentKey="risingArjunApp.enterprise.landline">Landline</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('fax')}>
                    <Translate contentKey="risingArjunApp.enterprise.fax">Fax</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('plotNo')}>
                    <Translate contentKey="risingArjunApp.enterprise.plotNo">Plot No</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('street')}>
                    <Translate contentKey="risingArjunApp.enterprise.street">Street</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('city')}>
                    <Translate contentKey="risingArjunApp.enterprise.city">City</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('state')}>
                    <Translate contentKey="risingArjunApp.enterprise.state">State</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('country')}>
                    <Translate contentKey="risingArjunApp.enterprise.country">Country</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('pincode')}>
                    <Translate contentKey="risingArjunApp.enterprise.pincode">Pincode</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {enterpriseList.map((enterprise, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${enterprise.id}`} color="link" size="sm">
                        {enterprise.id}
                      </Button>
                    </td>
                    <td>{enterprise.abbrevation}</td>
                    <td>{enterprise.enterprisename}</td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Natureofbusiness.${enterprise.natureofbusiness}`} />
                    </td>
                    <td>
                      {enterprise.logo ? (
                        <div>
                          <a onClick={openFile(enterprise.logoContentType, enterprise.logo)}>
                            <img src={`data:${enterprise.logoContentType};base64,${enterprise.logo}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                            {enterprise.logoContentType}, {byteSize(enterprise.logo)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{enterprise.punchline}</td>
                    <td>{enterprise.mission}</td>
                    <td>{enterprise.vision}</td>
                    <td>{enterprise.principles}</td>
                    <td>{enterprise.email}</td>
                    <td>{enterprise.mobile}</td>
                    <td>{enterprise.landline}</td>
                    <td>{enterprise.fax}</td>
                    <td>{enterprise.plotNo}</td>
                    <td>{enterprise.street}</td>
                    <td>
                      <Translate contentKey={`risingArjunApp.City.${enterprise.city}`} />
                    </td>
                    <td>
                      <Translate contentKey={`risingArjunApp.State.${enterprise.state}`} />
                    </td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Country.${enterprise.country}`} />
                    </td>
                    <td>{enterprise.pincode}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${enterprise.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${enterprise.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${enterprise.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.enterprise.home.notFound">No Enterprises found</Translate>
            </div>
          )}
        </div>
        <div className={enterpriseList && enterpriseList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ enterprise }: IRootState) => ({
  enterpriseList: enterprise.entities,
  totalItems: enterprise.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterpriseMySuffix);
