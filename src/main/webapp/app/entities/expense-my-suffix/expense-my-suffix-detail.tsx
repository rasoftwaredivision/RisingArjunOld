import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './expense-my-suffix.reducer';
import { IExpenseMySuffix } from 'app/shared/model/expense-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExpenseMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ExpenseMySuffixDetail extends React.Component<IExpenseMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { expenseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.expense.detail.title">Expense</Translate> [<b>{expenseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="item">
                <Translate contentKey="risingArjunApp.expense.item">Item</Translate>
              </span>
            </dt>
            <dd>{expenseEntity.item}</dd>
            <dt>
              <span id="quantity">
                <Translate contentKey="risingArjunApp.expense.quantity">Quantity</Translate>
              </span>
            </dt>
            <dd>{expenseEntity.quantity}</dd>
            <dt>
              <span id="rate">
                <Translate contentKey="risingArjunApp.expense.rate">Rate</Translate>
              </span>
            </dt>
            <dd>{expenseEntity.rate}</dd>
            <dt>
              <span id="laborCost">
                <Translate contentKey="risingArjunApp.expense.laborCost">Labor Cost</Translate>
              </span>
            </dt>
            <dd>{expenseEntity.laborCost}</dd>
            <dt>
              <span id="otherExpense">
                <Translate contentKey="risingArjunApp.expense.otherExpense">Other Expense</Translate>
              </span>
            </dt>
            <dd>{expenseEntity.otherExpense}</dd>
            <dt>
              <span id="total">
                <Translate contentKey="risingArjunApp.expense.total">Total</Translate>
              </span>
            </dt>
            <dd>{expenseEntity.total}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="risingArjunApp.expense.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={expenseEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="transactionId">
                <Translate contentKey="risingArjunApp.expense.transactionId">Transaction Id</Translate>
              </span>
            </dt>
            <dd>{expenseEntity.transactionId}</dd>
            <dt>
              <span id="expenseMode">
                <Translate contentKey="risingArjunApp.expense.expenseMode">Expense Mode</Translate>
              </span>
            </dt>
            <dd>{expenseEntity.expenseMode}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="risingArjunApp.expense.type">Type</Translate>
              </span>
            </dt>
            <dd>{expenseEntity.type}</dd>
            <dt>
              <span id="bill">
                <Translate contentKey="risingArjunApp.expense.bill">Bill</Translate>
              </span>
            </dt>
            <dd>
              {expenseEntity.bill ? (
                <div>
                  <a onClick={openFile(expenseEntity.billContentType, expenseEntity.bill)}>
                    <img src={`data:${expenseEntity.billContentType};base64,${expenseEntity.bill}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {expenseEntity.billContentType}, {byteSize(expenseEntity.bill)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="remarks">
                <Translate contentKey="risingArjunApp.expense.remarks">Remarks</Translate>
              </span>
            </dt>
            <dd>{expenseEntity.remarks}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.expense.enterprise">Enterprise</Translate>
            </dt>
            <dd>{expenseEntity.enterpriseEnterprisename ? expenseEntity.enterpriseEnterprisename : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.expense.incurredBy">Incurred By</Translate>
            </dt>
            <dd>{expenseEntity.incurredByEmployeeId ? expenseEntity.incurredByEmployeeId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/expense-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/expense-my-suffix/${expenseEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ expense }: IRootState) => ({
  expenseEntity: expense.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseMySuffixDetail);
