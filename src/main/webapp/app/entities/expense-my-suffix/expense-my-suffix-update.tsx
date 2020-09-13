import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEnterpriseMySuffix } from 'app/shared/model/enterprise-my-suffix.model';
import { getEntities as getEnterprises } from 'app/entities/enterprise-my-suffix/enterprise-my-suffix.reducer';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { getEntities as getEmployees } from 'app/entities/employee-my-suffix/employee-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './expense-my-suffix.reducer';
import { IExpenseMySuffix } from 'app/shared/model/expense-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExpenseMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IExpenseMySuffixUpdateState {
  isNew: boolean;
  enterpriseId: string;
  incurredById: string;
}

export class ExpenseMySuffixUpdate extends React.Component<IExpenseMySuffixUpdateProps, IExpenseMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      enterpriseId: '0',
      incurredById: '0',
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
    this.props.getEmployees();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { expenseEntity } = this.props;
      const entity = {
        ...expenseEntity,
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
    this.props.history.push('/entity/expense-my-suffix');
  };

  render() {
    const { expenseEntity, enterprises, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    const { bill, billContentType } = expenseEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.expense.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.expense.home.createOrEditLabel">Create or edit a Expense</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : expenseEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="expense-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="expense-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="itemLabel" for="expense-my-suffix-item">
                    <Translate contentKey="risingArjunApp.expense.item">Item</Translate>
                  </Label>
                  <AvField
                    id="expense-my-suffix-item"
                    type="text"
                    name="item"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="quantityLabel" for="expense-my-suffix-quantity">
                    <Translate contentKey="risingArjunApp.expense.quantity">Quantity</Translate>
                  </Label>
                  <AvField
                    id="expense-my-suffix-quantity"
                    type="string"
                    className="form-control"
                    name="quantity"
                    validate={{
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="rateLabel" for="expense-my-suffix-rate">
                    <Translate contentKey="risingArjunApp.expense.rate">Rate</Translate>
                  </Label>
                  <AvField
                    id="expense-my-suffix-rate"
                    type="string"
                    className="form-control"
                    name="rate"
                    validate={{
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="laborCostLabel" for="expense-my-suffix-laborCost">
                    <Translate contentKey="risingArjunApp.expense.laborCost">Labor Cost</Translate>
                  </Label>
                  <AvField
                    id="expense-my-suffix-laborCost"
                    type="string"
                    className="form-control"
                    name="laborCost"
                    validate={{
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="otherExpenseLabel" for="expense-my-suffix-otherExpense">
                    <Translate contentKey="risingArjunApp.expense.otherExpense">Other Expense</Translate>
                  </Label>
                  <AvField id="expense-my-suffix-otherExpense" type="string" className="form-control" name="otherExpense" />
                </AvGroup>
                <AvGroup>
                  <Label id="totalLabel" for="expense-my-suffix-total">
                    <Translate contentKey="risingArjunApp.expense.total">Total</Translate>
                  </Label>
                  <AvField
                    id="expense-my-suffix-total"
                    type="string"
                    className="form-control"
                    name="total"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="expense-my-suffix-date">
                    <Translate contentKey="risingArjunApp.expense.date">Date</Translate>
                  </Label>
                  <AvField id="expense-my-suffix-date" type="date" className="form-control" name="date" />
                </AvGroup>
                <AvGroup>
                  <Label id="transactionIdLabel" for="expense-my-suffix-transactionId">
                    <Translate contentKey="risingArjunApp.expense.transactionId">Transaction Id</Translate>
                  </Label>
                  <AvField
                    id="expense-my-suffix-transactionId"
                    type="text"
                    name="transactionId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="expenseModeLabel" for="expense-my-suffix-expenseMode">
                    <Translate contentKey="risingArjunApp.expense.expenseMode">Expense Mode</Translate>
                  </Label>
                  <AvInput
                    id="expense-my-suffix-expenseMode"
                    type="select"
                    className="form-control"
                    name="expenseMode"
                    value={(!isNew && expenseEntity.expenseMode) || 'NEFT'}
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
                  <Label id="typeLabel" for="expense-my-suffix-type">
                    <Translate contentKey="risingArjunApp.expense.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="expense-my-suffix-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && expenseEntity.type) || 'FIXASSET'}
                  >
                    <option value="FIXASSET">{translate('risingArjunApp.Expensetype.FIXASSET')}</option>
                    <option value="MARKETING">{translate('risingArjunApp.Expensetype.MARKETING')}</option>
                    <option value="OPERATING">{translate('risingArjunApp.Expensetype.OPERATING')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="billLabel" for="bill">
                      <Translate contentKey="risingArjunApp.expense.bill">Bill</Translate>
                    </Label>
                    <br />
                    {bill ? (
                      <div>
                        <a onClick={openFile(billContentType, bill)}>
                          <img src={`data:${billContentType};base64,${bill}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {billContentType}, {byteSize(bill)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('bill')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_bill" type="file" onChange={this.onBlobChange(true, 'bill')} accept="image/*" />
                    <AvInput type="hidden" name="bill" value={bill} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="remarksLabel" for="expense-my-suffix-remarks">
                    <Translate contentKey="risingArjunApp.expense.remarks">Remarks</Translate>
                  </Label>
                  <AvField id="expense-my-suffix-remarks" type="text" name="remarks" />
                </AvGroup>
                <AvGroup>
                  <Label for="expense-my-suffix-enterprise">
                    <Translate contentKey="risingArjunApp.expense.enterprise">Enterprise</Translate>
                  </Label>
                  <AvInput id="expense-my-suffix-enterprise" type="select" className="form-control" name="enterpriseId">
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
                  <Label for="expense-my-suffix-incurredBy">
                    <Translate contentKey="risingArjunApp.expense.incurredBy">Incurred By</Translate>
                  </Label>
                  <AvInput id="expense-my-suffix-incurredBy" type="select" className="form-control" name="incurredById">
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
                <Button tag={Link} id="cancel-save" to="/entity/expense-my-suffix" replace color="info">
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
  employees: storeState.employee.entities,
  expenseEntity: storeState.expense.entity,
  loading: storeState.expense.loading,
  updating: storeState.expense.updating,
  updateSuccess: storeState.expense.updateSuccess
});

const mapDispatchToProps = {
  getEnterprises,
  getEmployees,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseMySuffixUpdate);
