import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { getEntities as getEmployees } from 'app/entities/employee-my-suffix/employee-my-suffix.reducer';
import { IAcademicsessionMySuffix } from 'app/shared/model/academicsession-my-suffix.model';
import { getEntities as getAcademicsessions } from 'app/entities/academicsession-my-suffix/academicsession-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './salarypayment-my-suffix.reducer';
import { ISalarypaymentMySuffix } from 'app/shared/model/salarypayment-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISalarypaymentMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISalarypaymentMySuffixUpdateState {
  isNew: boolean;
  employeeIdId: string;
  sessionId: string;
}

export class SalarypaymentMySuffixUpdate extends React.Component<ISalarypaymentMySuffixUpdateProps, ISalarypaymentMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      employeeIdId: '0',
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

    this.props.getEmployees();
    this.props.getAcademicsessions();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { salarypaymentEntity } = this.props;
      const entity = {
        ...salarypaymentEntity,
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
    this.props.history.push('/entity/salarypayment-my-suffix');
  };

  render() {
    const { salarypaymentEntity, employees, academicsessions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.salarypayment.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.salarypayment.home.createOrEditLabel">Create or edit a Salarypayment</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : salarypaymentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="salarypayment-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="salarypayment-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="salaryLabel" for="salarypayment-my-suffix-salary">
                    <Translate contentKey="risingArjunApp.salarypayment.salary">Salary</Translate>
                  </Label>
                  <AvField
                    id="salarypayment-my-suffix-salary"
                    type="string"
                    className="form-control"
                    name="salary"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="monthLabel" for="salarypayment-my-suffix-month">
                    <Translate contentKey="risingArjunApp.salarypayment.month">Month</Translate>
                  </Label>
                  <AvInput
                    id="salarypayment-my-suffix-month"
                    type="select"
                    className="form-control"
                    name="month"
                    value={(!isNew && salarypaymentEntity.month) || 'JAN'}
                  >
                    <option value="JAN">{translate('risingArjunApp.Month.JAN')}</option>
                    <option value="FEB">{translate('risingArjunApp.Month.FEB')}</option>
                    <option value="MAR">{translate('risingArjunApp.Month.MAR')}</option>
                    <option value="APR">{translate('risingArjunApp.Month.APR')}</option>
                    <option value="MAY">{translate('risingArjunApp.Month.MAY')}</option>
                    <option value="JUN">{translate('risingArjunApp.Month.JUN')}</option>
                    <option value="JUL">{translate('risingArjunApp.Month.JUL')}</option>
                    <option value="AUG">{translate('risingArjunApp.Month.AUG')}</option>
                    <option value="SEP">{translate('risingArjunApp.Month.SEP')}</option>
                    <option value="OCT">{translate('risingArjunApp.Month.OCT')}</option>
                    <option value="NOV">{translate('risingArjunApp.Month.NOV')}</option>
                    <option value="DEC">{translate('risingArjunApp.Month.DEC')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="paidLabel" for="salarypayment-my-suffix-paid">
                    <Translate contentKey="risingArjunApp.salarypayment.paid">Paid</Translate>
                  </Label>
                  <AvField
                    id="salarypayment-my-suffix-paid"
                    type="string"
                    className="form-control"
                    name="paid"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="unpaidLabel" for="salarypayment-my-suffix-unpaid">
                    <Translate contentKey="risingArjunApp.salarypayment.unpaid">Unpaid</Translate>
                  </Label>
                  <AvField
                    id="salarypayment-my-suffix-unpaid"
                    type="string"
                    className="form-control"
                    name="unpaid"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="salarypayment-my-suffix-date">
                    <Translate contentKey="risingArjunApp.salarypayment.date">Date</Translate>
                  </Label>
                  <AvField
                    id="salarypayment-my-suffix-date"
                    type="date"
                    className="form-control"
                    name="date"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="transactionIdLabel" for="salarypayment-my-suffix-transactionId">
                    <Translate contentKey="risingArjunApp.salarypayment.transactionId">Transaction Id</Translate>
                  </Label>
                  <AvField
                    id="salarypayment-my-suffix-transactionId"
                    type="text"
                    name="transactionId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="paymentModeLabel" for="salarypayment-my-suffix-paymentMode">
                    <Translate contentKey="risingArjunApp.salarypayment.paymentMode">Payment Mode</Translate>
                  </Label>
                  <AvInput
                    id="salarypayment-my-suffix-paymentMode"
                    type="select"
                    className="form-control"
                    name="paymentMode"
                    value={(!isNew && salarypaymentEntity.paymentMode) || 'NEFT'}
                  >
                    <option value="NEFT">{translate('risingArjunApp.Mode.NEFT')}</option>
                    <option value="UPI">{translate('risingArjunApp.Mode.UPI')}</option>
                    <option value="CASH">{translate('risingArjunApp.Mode.CASH')}</option>
                    <option value="DEBITCARD">{translate('risingArjunApp.Mode.DEBITCARD')}</option>
                    <option value="NETBANKING">{translate('risingArjunApp.Mode.NETBANKING')}</option>
                    <option value="OTHERS">{translate('risingArjunApp.Mode.OTHERS')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="remarksLabel" for="salarypayment-my-suffix-remarks">
                    <Translate contentKey="risingArjunApp.salarypayment.remarks">Remarks</Translate>
                  </Label>
                  <AvField id="salarypayment-my-suffix-remarks" type="text" name="remarks" />
                </AvGroup>
                <AvGroup>
                  <Label for="salarypayment-my-suffix-employeeId">
                    <Translate contentKey="risingArjunApp.salarypayment.employeeId">Employee Id</Translate>
                  </Label>
                  <AvInput id="salarypayment-my-suffix-employeeId" type="select" className="form-control" name="employeeIdId">
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.employeeId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="salarypayment-my-suffix-session">
                    <Translate contentKey="risingArjunApp.salarypayment.session">Session</Translate>
                  </Label>
                  <AvInput id="salarypayment-my-suffix-session" type="select" className="form-control" name="sessionId">
                    <option value="" key="0" />
                    {academicsessions
                      ? academicsessions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.acadSessionId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/salarypayment-my-suffix" replace color="info">
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
  employees: storeState.employee.entities,
  academicsessions: storeState.academicsession.entities,
  salarypaymentEntity: storeState.salarypayment.entity,
  loading: storeState.salarypayment.loading,
  updating: storeState.salarypayment.updating,
  updateSuccess: storeState.salarypayment.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
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
)(SalarypaymentMySuffixUpdate);
