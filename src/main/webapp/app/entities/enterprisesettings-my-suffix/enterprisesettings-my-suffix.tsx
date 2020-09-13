import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './enterprisesettings-my-suffix.reducer';
import { IEnterprisesettingsMySuffix } from 'app/shared/model/enterprisesettings-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnterprisesettingsMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EnterprisesettingsMySuffix extends React.Component<IEnterprisesettingsMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { enterprisesettingsList, match } = this.props;
    return (
      <div>
        <h2 id="enterprisesettings-my-suffix-heading">
          <Translate contentKey="risingArjunApp.enterprisesettings.home.title">Enterprisesettings</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.enterprisesettings.home.createLabel">Create new Enterprisesettings</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {enterprisesettingsList && enterprisesettingsList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.enterprisesettings.theme">Theme</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.enterprisesettings.foreground">Foreground</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.enterprisesettings.background">Background</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.enterprisesettings.disclaimer">Disclaimer</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.enterprisesettings.policy">Policy</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.enterprisesettings.copyrights">Copyrights</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.enterprisesettings.termsOfUsage">Terms Of Usage</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.enterprisesettings.admin">Admin</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.enterprisesettings.enterprise">Enterprise</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {enterprisesettingsList.map((enterprisesettings, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${enterprisesettings.id}`} color="link" size="sm">
                        {enterprisesettings.id}
                      </Button>
                    </td>
                    <td>{enterprisesettings.theme}</td>
                    <td>{enterprisesettings.foreground}</td>
                    <td>{enterprisesettings.background}</td>
                    <td>{enterprisesettings.disclaimer}</td>
                    <td>{enterprisesettings.policy}</td>
                    <td>{enterprisesettings.copyrights}</td>
                    <td>{enterprisesettings.termsOfUsage}</td>
                    <td>{enterprisesettings.adminLogin ? enterprisesettings.adminLogin : ''}</td>
                    <td>
                      {enterprisesettings.enterpriseEnterprisename ? (
                        <Link to={`enterprise-my-suffix/${enterprisesettings.enterpriseId}`}>
                          {enterprisesettings.enterpriseEnterprisename}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${enterprisesettings.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${enterprisesettings.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${enterprisesettings.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.enterprisesettings.home.notFound">No Enterprisesettings found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ enterprisesettings }: IRootState) => ({
  enterprisesettingsList: enterprisesettings.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterprisesettingsMySuffix);
