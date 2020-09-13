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
import { getEntity, updateEntity, createEntity, reset } from './userdetail-my-suffix.reducer';
import { IUserdetailMySuffix } from 'app/shared/model/userdetail-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserdetailMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUserdetailMySuffixUpdateState {
  isNew: boolean;
  userId: string;
  enterpriseId: string;
}

export class UserdetailMySuffixUpdate extends React.Component<IUserdetailMySuffixUpdateProps, IUserdetailMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
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
      const { userdetailEntity } = this.props;
      const entity = {
        ...userdetailEntity,
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
    this.props.history.push('/entity/userdetail-my-suffix');
  };

  render() {
    const { userdetailEntity, users, enterprises, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.userdetail.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.userdetail.home.createOrEditLabel">Create or edit a Userdetail</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : userdetailEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="userdetail-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="userdetail-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="mobileNoLabel" for="userdetail-my-suffix-mobileNo">
                    <Translate contentKey="risingArjunApp.userdetail.mobileNo">Mobile No</Translate>
                  </Label>
                  <AvField
                    id="userdetail-my-suffix-mobileNo"
                    type="text"
                    name="mobileNo"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dobLabel" for="userdetail-my-suffix-dob">
                    <Translate contentKey="risingArjunApp.userdetail.dob">Dob</Translate>
                  </Label>
                  <AvField
                    id="userdetail-my-suffix-dob"
                    type="date"
                    className="form-control"
                    name="dob"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="houseNoLabel" for="userdetail-my-suffix-houseNo">
                    <Translate contentKey="risingArjunApp.userdetail.houseNo">House No</Translate>
                  </Label>
                  <AvField
                    id="userdetail-my-suffix-houseNo"
                    type="text"
                    name="houseNo"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="streetLabel" for="userdetail-my-suffix-street">
                    <Translate contentKey="risingArjunApp.userdetail.street">Street</Translate>
                  </Label>
                  <AvField id="userdetail-my-suffix-street" type="text" name="street" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="userdetail-my-suffix-city">
                    <Translate contentKey="risingArjunApp.userdetail.city">City</Translate>
                  </Label>
                  <AvInput
                    id="userdetail-my-suffix-city"
                    type="select"
                    className="form-control"
                    name="city"
                    value={(!isNew && userdetailEntity.city) || 'DEHRADUN'}
                  >
                    <option value="DEHRADUN">{translate('risingArjunApp.City.DEHRADUN')}</option>
                    <option value="DELHI">{translate('risingArjunApp.City.DELHI')}</option>
                    <option value="GURGAON">{translate('risingArjunApp.City.GURGAON')}</option>
                    <option value="LONI">{translate('risingArjunApp.City.LONI')}</option>
                    <option value="TEHRI">{translate('risingArjunApp.City.TEHRI')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="stateLabel" for="userdetail-my-suffix-state">
                    <Translate contentKey="risingArjunApp.userdetail.state">State</Translate>
                  </Label>
                  <AvInput
                    id="userdetail-my-suffix-state"
                    type="select"
                    className="form-control"
                    name="state"
                    value={(!isNew && userdetailEntity.state) || 'DELHI'}
                  >
                    <option value="DELHI">{translate('risingArjunApp.State.DELHI')}</option>
                    <option value="HARYANA">{translate('risingArjunApp.State.HARYANA')}</option>
                    <option value="MADHYAPRADESH">{translate('risingArjunApp.State.MADHYAPRADESH')}</option>
                    <option value="UTTRAKHAND">{translate('risingArjunApp.State.UTTRAKHAND')}</option>
                    <option value="UTTARPRADESH">{translate('risingArjunApp.State.UTTARPRADESH')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="userdetail-my-suffix-country">
                    <Translate contentKey="risingArjunApp.userdetail.country">Country</Translate>
                  </Label>
                  <AvInput
                    id="userdetail-my-suffix-country"
                    type="select"
                    className="form-control"
                    name="country"
                    value={(!isNew && userdetailEntity.country) || 'INDIA'}
                  >
                    <option value="INDIA">{translate('risingArjunApp.Country.INDIA')}</option>
                    <option value="AUSTRALIA">{translate('risingArjunApp.Country.AUSTRALIA')}</option>
                    <option value="USA">{translate('risingArjunApp.Country.USA')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="pincodeLabel" for="userdetail-my-suffix-pincode">
                    <Translate contentKey="risingArjunApp.userdetail.pincode">Pincode</Translate>
                  </Label>
                  <AvField id="userdetail-my-suffix-pincode" type="string" className="form-control" name="pincode" />
                </AvGroup>
                <AvGroup>
                  <Label for="userdetail-my-suffix-user">
                    <Translate contentKey="risingArjunApp.userdetail.user">User</Translate>
                  </Label>
                  <AvInput id="userdetail-my-suffix-user" type="select" className="form-control" name="userId">
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
                  <Label for="userdetail-my-suffix-enterprise">
                    <Translate contentKey="risingArjunApp.userdetail.enterprise">Enterprise</Translate>
                  </Label>
                  <AvInput id="userdetail-my-suffix-enterprise" type="select" className="form-control" name="enterpriseId">
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
                <Button tag={Link} id="cancel-save" to="/entity/userdetail-my-suffix" replace color="info">
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
  userdetailEntity: storeState.userdetail.entity,
  loading: storeState.userdetail.loading,
  updating: storeState.userdetail.updating,
  updateSuccess: storeState.userdetail.updateSuccess
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
)(UserdetailMySuffixUpdate);
