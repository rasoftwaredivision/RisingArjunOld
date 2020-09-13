import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './roleaccess-my-suffix.reducer';
import { IRoleaccessMySuffix } from 'app/shared/model/roleaccess-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRoleaccessMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RoleaccessMySuffixDetail extends React.Component<IRoleaccessMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { roleaccessEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.roleaccess.detail.title">Roleaccess</Translate> [<b>{roleaccessEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="create">
                <Translate contentKey="risingArjunApp.roleaccess.create">Create</Translate>
              </span>
            </dt>
            <dd>{roleaccessEntity.create ? 'true' : 'false'}</dd>
            <dt>
              <span id="read">
                <Translate contentKey="risingArjunApp.roleaccess.read">Read</Translate>
              </span>
            </dt>
            <dd>{roleaccessEntity.read ? 'true' : 'false'}</dd>
            <dt>
              <span id="update">
                <Translate contentKey="risingArjunApp.roleaccess.update">Update</Translate>
              </span>
            </dt>
            <dd>{roleaccessEntity.update ? 'true' : 'false'}</dd>
            <dt>
              <span id="del">
                <Translate contentKey="risingArjunApp.roleaccess.del">Del</Translate>
              </span>
            </dt>
            <dd>{roleaccessEntity.del ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.roleaccess.role">Role</Translate>
            </dt>
            <dd>{roleaccessEntity.roleName ? roleaccessEntity.roleName : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.roleaccess.feature">Feature</Translate>
            </dt>
            <dd>{roleaccessEntity.featureFeatureDetail ? roleaccessEntity.featureFeatureDetail : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/roleaccess-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/roleaccess-my-suffix/${roleaccessEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ roleaccess }: IRootState) => ({
  roleaccessEntity: roleaccess.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleaccessMySuffixDetail);
