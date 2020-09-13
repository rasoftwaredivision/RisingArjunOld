import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './center-my-suffix.reducer';
import { ICenterMySuffix } from 'app/shared/model/center-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICenterMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CenterMySuffix extends React.Component<ICenterMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { centerList, match } = this.props;
    return (
      <div>
        <h2 id="center-my-suffix-heading">
          <Translate contentKey="risingArjunApp.center.home.title">Centers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.center.home.createLabel">Create new Center</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {centerList && centerList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.center.centerCode">Center Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.center.centerTitle">Center Title</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.center.street">Street</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.center.city">City</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.center.state">State</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.center.country">Country</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.center.pincode">Pincode</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.center.enterprise">Enterprise</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {centerList.map((center, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${center.id}`} color="link" size="sm">
                        {center.id}
                      </Button>
                    </td>
                    <td>{center.centerCode}</td>
                    <td>{center.centerTitle}</td>
                    <td>{center.street}</td>
                    <td>
                      <Translate contentKey={`risingArjunApp.City.${center.city}`} />
                    </td>
                    <td>
                      <Translate contentKey={`risingArjunApp.State.${center.state}`} />
                    </td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Country.${center.country}`} />
                    </td>
                    <td>{center.pincode}</td>
                    <td>
                      {center.enterpriseEnterprisename ? (
                        <Link to={`enterprise-my-suffix/${center.enterpriseId}`}>{center.enterpriseEnterprisename}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${center.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${center.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${center.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.center.home.notFound">No Centers found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ center }: IRootState) => ({
  centerList: center.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenterMySuffix);
