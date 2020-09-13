import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IEnterpriseMySuffix } from 'app/shared/model/enterprise-my-suffix.model';
import { getEntities as getEnterprises } from 'app/entities/enterprise-my-suffix/enterprise-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './enterprisesettings-my-suffix.reducer';
import { IEnterprisesettingsMySuffix } from 'app/shared/model/enterprisesettings-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEnterprisesettingsMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEnterprisesettingsMySuffixUpdateState {
  isNew: boolean;
  adminId: string;
  enterpriseId: string;
}

export class EnterprisesettingsMySuffixUpdate extends React.Component<
  IEnterprisesettingsMySuffixUpdateProps,
  IEnterprisesettingsMySuffixUpdateState
> {
  constructor(props) {
    super(props);
    this.state = {
      adminId: '0',
      enterpriseId: '0',
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

    this.props.getUsers();
    this.props.getEnterprises();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { enterprisesettingsEntity } = this.props;
      const entity = {
        ...enterprisesettingsEntity,
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
    this.props.history.push('/entity/enterprisesettings-my-suffix');
  };

  render() {
    const { enterprisesettingsEntity, users, enterprises, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.enterprisesettings.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.enterprisesettings.home.createOrEditLabel">
                Create or edit a Enterprisesettings
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : enterprisesettingsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="enterprisesettings-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="enterprisesettings-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="themeLabel" for="enterprisesettings-my-suffix-theme">
                    <Translate contentKey="risingArjunApp.enterprisesettings.theme">Theme</Translate>
                  </Label>
                  <AvField id="enterprisesettings-my-suffix-theme" type="text" name="theme" />
                </AvGroup>
                <AvGroup>
                  <Label id="foregroundLabel" for="enterprisesettings-my-suffix-foreground">
                    <Translate contentKey="risingArjunApp.enterprisesettings.foreground">Foreground</Translate>
                  </Label>
                  <AvField id="enterprisesettings-my-suffix-foreground" type="text" name="foreground" />
                </AvGroup>
                <AvGroup>
                  <Label id="backgroundLabel" for="enterprisesettings-my-suffix-background">
                    <Translate contentKey="risingArjunApp.enterprisesettings.background">Background</Translate>
                  </Label>
                  <AvField id="enterprisesettings-my-suffix-background" type="text" name="background" />
                </AvGroup>
                <AvGroup>
                  <Label id="disclaimerLabel" for="enterprisesettings-my-suffix-disclaimer">
                    <Translate contentKey="risingArjunApp.enterprisesettings.disclaimer">Disclaimer</Translate>
                  </Label>
                  <AvField id="enterprisesettings-my-suffix-disclaimer" type="text" name="disclaimer" />
                </AvGroup>
                <AvGroup>
                  <Label id="policyLabel" for="enterprisesettings-my-suffix-policy">
                    <Translate contentKey="risingArjunApp.enterprisesettings.policy">Policy</Translate>
                  </Label>
                  <AvField id="enterprisesettings-my-suffix-policy" type="text" name="policy" />
                </AvGroup>
                <AvGroup>
                  <Label id="copyrightsLabel" for="enterprisesettings-my-suffix-copyrights">
                    <Translate contentKey="risingArjunApp.enterprisesettings.copyrights">Copyrights</Translate>
                  </Label>
                  <AvField id="enterprisesettings-my-suffix-copyrights" type="text" name="copyrights" />
                </AvGroup>
                <AvGroup>
                  <Label id="termsOfUsageLabel" for="enterprisesettings-my-suffix-termsOfUsage">
                    <Translate contentKey="risingArjunApp.enterprisesettings.termsOfUsage">Terms Of Usage</Translate>
                  </Label>
                  <AvField id="enterprisesettings-my-suffix-termsOfUsage" type="text" name="termsOfUsage" />
                </AvGroup>
                <AvGroup>
                  <Label for="enterprisesettings-my-suffix-admin">
                    <Translate contentKey="risingArjunApp.enterprisesettings.admin">Admin</Translate>
                  </Label>
                  <AvInput id="enterprisesettings-my-suffix-admin" type="select" className="form-control" name="adminId">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="enterprisesettings-my-suffix-enterprise">
                    <Translate contentKey="risingArjunApp.enterprisesettings.enterprise">Enterprise</Translate>
                  </Label>
                  <AvInput id="enterprisesettings-my-suffix-enterprise" type="select" className="form-control" name="enterpriseId">
                    <option value="" key="0" />
                    {enterprises
                      ? enterprises.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.enterprisename}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/enterprisesettings-my-suffix" replace color="info">
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
  users: storeState.userManagement.users,
  enterprises: storeState.enterprise.entities,
  enterprisesettingsEntity: storeState.enterprisesettings.entity,
  loading: storeState.enterprisesettings.loading,
  updating: storeState.enterprisesettings.updating,
  updateSuccess: storeState.enterprisesettings.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEnterprises,
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
)(EnterprisesettingsMySuffixUpdate);
