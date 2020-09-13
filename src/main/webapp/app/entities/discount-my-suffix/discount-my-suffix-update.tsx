import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEnterpriseMySuffix } from 'app/shared/model/enterprise-my-suffix.model';
import { getEntities as getEnterprises } from 'app/entities/enterprise-my-suffix/enterprise-my-suffix.reducer';
import { IAcademicsessionMySuffix } from 'app/shared/model/academicsession-my-suffix.model';
import { getEntities as getAcademicsessions } from 'app/entities/academicsession-my-suffix/academicsession-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './discount-my-suffix.reducer';
import { IDiscountMySuffix } from 'app/shared/model/discount-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDiscountMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDiscountMySuffixUpdateState {
  isNew: boolean;
  enterpriseId: string;
  sessionId: string;
}

export class DiscountMySuffixUpdate extends React.Component<IDiscountMySuffixUpdateProps, IDiscountMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      enterpriseId: '0',
      sessionId: '0',
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

    this.props.getEnterprises();
    this.props.getAcademicsessions();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { discountEntity } = this.props;
      const entity = {
        ...discountEntity,
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
    this.props.history.push('/entity/discount-my-suffix');
  };

  render() {
    const { discountEntity, enterprises, academicsessions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.discount.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.discount.home.createOrEditLabel">Create or edit a Discount</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : discountEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="discount-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="discount-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="subject2Label" for="discount-my-suffix-subject2">
                    <Translate contentKey="risingArjunApp.discount.subject2">Subject 2</Translate>
                  </Label>
                  <AvField id="discount-my-suffix-subject2" type="string" className="form-control" name="subject2" />
                </AvGroup>
                <AvGroup>
                  <Label id="subject3Label" for="discount-my-suffix-subject3">
                    <Translate contentKey="risingArjunApp.discount.subject3">Subject 3</Translate>
                  </Label>
                  <AvField id="discount-my-suffix-subject3" type="string" className="form-control" name="subject3" />
                </AvGroup>
                <AvGroup>
                  <Label id="subject4Label" for="discount-my-suffix-subject4">
                    <Translate contentKey="risingArjunApp.discount.subject4">Subject 4</Translate>
                  </Label>
                  <AvField id="discount-my-suffix-subject4" type="string" className="form-control" name="subject4" />
                </AvGroup>
                <AvGroup>
                  <Label id="subject5Label" for="discount-my-suffix-subject5">
                    <Translate contentKey="risingArjunApp.discount.subject5">Subject 5</Translate>
                  </Label>
                  <AvField id="discount-my-suffix-subject5" type="string" className="form-control" name="subject5" />
                </AvGroup>
                <AvGroup>
                  <Label id="subject6Label" for="discount-my-suffix-subject6">
                    <Translate contentKey="risingArjunApp.discount.subject6">Subject 6</Translate>
                  </Label>
                  <AvField id="discount-my-suffix-subject6" type="string" className="form-control" name="subject6" />
                </AvGroup>
                <AvGroup>
                  <Label id="subject7Label" for="discount-my-suffix-subject7">
                    <Translate contentKey="risingArjunApp.discount.subject7">Subject 7</Translate>
                  </Label>
                  <AvField id="discount-my-suffix-subject7" type="string" className="form-control" name="subject7" />
                </AvGroup>
                <AvGroup>
                  <Label id="subject8Label" for="discount-my-suffix-subject8">
                    <Translate contentKey="risingArjunApp.discount.subject8">Subject 8</Translate>
                  </Label>
                  <AvField id="discount-my-suffix-subject8" type="string" className="form-control" name="subject8" />
                </AvGroup>
                <AvGroup>
                  <Label id="quarterlyLabel" for="discount-my-suffix-quarterly">
                    <Translate contentKey="risingArjunApp.discount.quarterly">Quarterly</Translate>
                  </Label>
                  <AvField id="discount-my-suffix-quarterly" type="string" className="form-control" name="quarterly" />
                </AvGroup>
                <AvGroup>
                  <Label id="halfYearlyLabel" for="discount-my-suffix-halfYearly">
                    <Translate contentKey="risingArjunApp.discount.halfYearly">Half Yearly</Translate>
                  </Label>
                  <AvField id="discount-my-suffix-halfYearly" type="string" className="form-control" name="halfYearly" />
                </AvGroup>
                <AvGroup>
                  <Label id="annuallyLabel" for="discount-my-suffix-annually">
                    <Translate contentKey="risingArjunApp.discount.annually">Annually</Translate>
                  </Label>
                  <AvField id="discount-my-suffix-annually" type="string" className="form-control" name="annually" />
                </AvGroup>
                <AvGroup>
                  <Label id="siblingLabel" for="discount-my-suffix-sibling">
                    <Translate contentKey="risingArjunApp.discount.sibling">Sibling</Translate>
                  </Label>
                  <AvField id="discount-my-suffix-sibling" type="string" className="form-control" name="sibling" />
                </AvGroup>
                <AvGroup>
                  <Label id="referralLabel" for="discount-my-suffix-referral">
                    <Translate contentKey="risingArjunApp.discount.referral">Referral</Translate>
                  </Label>
                  <AvField id="discount-my-suffix-referral" type="string" className="form-control" name="referral" />
                </AvGroup>
                <AvGroup>
                  <Label for="discount-my-suffix-enterprise">
                    <Translate contentKey="risingArjunApp.discount.enterprise">Enterprise</Translate>
                  </Label>
                  <AvInput id="discount-my-suffix-enterprise" type="select" className="form-control" name="enterpriseId">
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
                <AvGroup>
                  <Label for="discount-my-suffix-session">
                    <Translate contentKey="risingArjunApp.discount.session">Session</Translate>
                  </Label>
                  <AvInput id="discount-my-suffix-session" type="select" className="form-control" name="sessionId">
                    <option value="" key="0" />
                    {academicsessions
                      ? academicsessions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.acadSession}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/discount-my-suffix" replace color="info">
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
  enterprises: storeState.enterprise.entities,
  academicsessions: storeState.academicsession.entities,
  discountEntity: storeState.discount.entity,
  loading: storeState.discount.loading,
  updating: storeState.discount.updating,
  updateSuccess: storeState.discount.updateSuccess
});

const mapDispatchToProps = {
  getEnterprises,
  getAcademicsessions,
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
)(DiscountMySuffixUpdate);
