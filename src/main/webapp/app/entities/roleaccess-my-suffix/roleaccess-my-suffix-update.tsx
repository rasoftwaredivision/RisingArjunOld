import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IJhiauthorityMySuffix } from 'app/shared/model/jhiauthority-my-suffix.model';
import { getEntities as getJhiauthorities } from 'app/entities/jhiauthority-my-suffix/jhiauthority-my-suffix.reducer';
import { IFeatureMySuffix } from 'app/shared/model/feature-my-suffix.model';
import { getEntities as getFeatures } from 'app/entities/feature-my-suffix/feature-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './roleaccess-my-suffix.reducer';
import { IRoleaccessMySuffix } from 'app/shared/model/roleaccess-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRoleaccessMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRoleaccessMySuffixUpdateState {
  isNew: boolean;
  roleId: string;
  featureId: string;
}

export class RoleaccessMySuffixUpdate extends React.Component<IRoleaccessMySuffixUpdateProps, IRoleaccessMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      roleId: '0',
      featureId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getJhiauthorities();
    this.props.getFeatures();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { roleaccessEntity } = this.props;
      const entity = {
        ...roleaccessEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/roleaccess-my-suffix');
  };

  render() {
    const { roleaccessEntity, jhiauthorities, features, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.roleaccess.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.roleaccess.home.createOrEditLabel">Create or edit a Roleaccess</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : roleaccessEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="roleaccess-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="roleaccess-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createLabel" check>
                    <AvInput id="roleaccess-my-suffix-create" type="checkbox" className="form-control" name="create" />
                    <Translate contentKey="risingArjunApp.roleaccess.create">Create</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="readLabel" check>
                    <AvInput id="roleaccess-my-suffix-read" type="checkbox" className="form-control" name="read" />
                    <Translate contentKey="risingArjunApp.roleaccess.read">Read</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="updateLabel" check>
                    <AvInput id="roleaccess-my-suffix-update" type="checkbox" className="form-control" name="update" />
                    <Translate contentKey="risingArjunApp.roleaccess.update">Update</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="delLabel" check>
                    <AvInput id="roleaccess-my-suffix-del" type="checkbox" className="form-control" name="del" />
                    <Translate contentKey="risingArjunApp.roleaccess.del">Del</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="roleaccess-my-suffix-role">
                    <Translate contentKey="risingArjunApp.roleaccess.role">Role</Translate>
                  </Label>
                  <AvInput id="roleaccess-my-suffix-role" type="select" className="form-control" name="roleId">
                    <option value="" key="0" />
                    {jhiauthorities
                      ? jhiauthorities.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="roleaccess-my-suffix-feature">
                    <Translate contentKey="risingArjunApp.roleaccess.feature">Feature</Translate>
                  </Label>
                  <AvInput id="roleaccess-my-suffix-feature" type="select" className="form-control" name="featureId">
                    <option value="" key="0" />
                    {features
                      ? features.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.featureDetail}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/roleaccess-my-suffix" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  jhiauthorities: storeState.jhiauthority.entities,
  features: storeState.feature.entities,
  roleaccessEntity: storeState.roleaccess.entity,
  loading: storeState.roleaccess.loading,
  updating: storeState.roleaccess.updating,
  updateSuccess: storeState.roleaccess.updateSuccess
});

const mapDispatchToProps = {
  getJhiauthorities,
  getFeatures,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleaccessMySuffixUpdate);
