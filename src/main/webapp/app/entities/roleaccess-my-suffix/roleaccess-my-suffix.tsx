import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './roleaccess-my-suffix.reducer';
import { IRoleaccessMySuffix } from 'app/shared/model/roleaccess-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRoleaccessMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class RoleaccessMySuffix extends React.Component<IRoleaccessMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { roleaccessList, match } = this.props;
    return (
      <div>
        <h2 id="roleaccess-my-suffix-heading">
          <Translate contentKey="risingArjunApp.roleaccess.home.title">Roleaccesses</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.roleaccess.home.createLabel">Create new Roleaccess</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {roleaccessList && roleaccessList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.roleaccess.create">Create</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.roleaccess.read">Read</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.roleaccess.update">Update</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.roleaccess.del">Del</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.roleaccess.role">Role</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.roleaccess.feature">Feature</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {roleaccessList.map((roleaccess, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${roleaccess.id}`} color="link" size="sm">
                        {roleaccess.id}
                      </Button>
                    </td>
                    <td>{roleaccess.create ? 'true' : 'false'}</td>
                    <td>{roleaccess.read ? 'true' : 'false'}</td>
                    <td>{roleaccess.update ? 'true' : 'false'}</td>
                    <td>{roleaccess.del ? 'true' : 'false'}</td>
                    <td>
                      {roleaccess.roleName ? <Link to={`jhiauthority-my-suffix/${roleaccess.roleId}`}>{roleaccess.roleName}</Link> : ''}
                    </td>
                    <td>
                      {roleaccess.featureFeatureDetail ? (
                        <Link to={`feature-my-suffix/${roleaccess.featureId}`}>{roleaccess.featureFeatureDetail}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${roleaccess.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${roleaccess.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${roleaccess.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.roleaccess.home.notFound">No Roleaccesses found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ roleaccess }: IRootState) => ({
  roleaccessList: roleaccess.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleaccessMySuffix);
