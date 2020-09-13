import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './salarypayment-my-suffix.reducer';
import { ISalarypaymentMySuffix } from 'app/shared/model/salarypayment-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISalarypaymentMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SalarypaymentMySuffixDetail extends React.Component<ISalarypaymentMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { salarypaymentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.salarypayment.detail.title">Salarypayment</Translate> [<b>{salarypaymentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="salary">
                <Translate contentKey="risingArjunApp.salarypayment.salary">Salary</Translate>
              </span>
            </dt>
            <dd>{salarypaymentEntity.salary}</dd>
            <dt>
              <span id="month">
                <Translate contentKey="risingArjunApp.salarypayment.month">Month</Translate>
              </span>
            </dt>
            <dd>{salarypaymentEntity.month}</dd>
            <dt>
              <span id="paid">
                <Translate contentKey="risingArjunApp.salarypayment.paid">Paid</Translate>
              </span>
            </dt>
            <dd>{salarypaymentEntity.paid}</dd>
            <dt>
              <span id="unpaid">
                <Translate contentKey="risingArjunApp.salarypayment.unpaid">Unpaid</Translate>
              </span>
            </dt>
            <dd>{salarypaymentEntity.unpaid}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="risingArjunApp.salarypayment.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={salarypaymentEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="transactionId">
                <Translate contentKey="risingArjunApp.salarypayment.transactionId">Transaction Id</Translate>
              </span>
            </dt>
            <dd>{salarypaymentEntity.transactionId}</dd>
            <dt>
              <span id="paymentMode">
                <Translate contentKey="risingArjunApp.salarypayment.paymentMode">Payment Mode</Translate>
              </span>
            </dt>
            <dd>{salarypaymentEntity.paymentMode}</dd>
            <dt>
              <span id="remarks">
                <Translate contentKey="risingArjunApp.salarypayment.remarks">Remarks</Translate>
              </span>
            </dt>
            <dd>{salarypaymentEntity.remarks}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.salarypayment.employeeId">Employee Id</Translate>
            </dt>
            <dd>{salarypaymentEntity.employeeIdEmployeeId ? salarypaymentEntity.employeeIdEmployeeId : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.salarypayment.session">Session</Translate>
            </dt>
            <dd>{salarypaymentEntity.sessionAcadSessionId ? salarypaymentEntity.sessionAcadSessionId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/salarypayment-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/salarypayment-my-suffix/${salarypaymentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ salarypayment }: IRootState) => ({
  salarypaymentEntity: salarypayment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalarypaymentMySuffixDetail);
