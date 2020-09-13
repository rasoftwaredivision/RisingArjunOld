import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './discount-my-suffix.reducer';
import { IDiscountMySuffix } from 'app/shared/model/discount-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDiscountMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DiscountMySuffixDetail extends React.Component<IDiscountMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { discountEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.discount.detail.title">Discount</Translate> [<b>{discountEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="subject2">
                <Translate contentKey="risingArjunApp.discount.subject2">Subject 2</Translate>
              </span>
            </dt>
            <dd>{discountEntity.subject2}</dd>
            <dt>
              <span id="subject3">
                <Translate contentKey="risingArjunApp.discount.subject3">Subject 3</Translate>
              </span>
            </dt>
            <dd>{discountEntity.subject3}</dd>
            <dt>
              <span id="subject4">
                <Translate contentKey="risingArjunApp.discount.subject4">Subject 4</Translate>
              </span>
            </dt>
            <dd>{discountEntity.subject4}</dd>
            <dt>
              <span id="subject5">
                <Translate contentKey="risingArjunApp.discount.subject5">Subject 5</Translate>
              </span>
            </dt>
            <dd>{discountEntity.subject5}</dd>
            <dt>
              <span id="subject6">
                <Translate contentKey="risingArjunApp.discount.subject6">Subject 6</Translate>
              </span>
            </dt>
            <dd>{discountEntity.subject6}</dd>
            <dt>
              <span id="subject7">
                <Translate contentKey="risingArjunApp.discount.subject7">Subject 7</Translate>
              </span>
            </dt>
            <dd>{discountEntity.subject7}</dd>
            <dt>
              <span id="subject8">
                <Translate contentKey="risingArjunApp.discount.subject8">Subject 8</Translate>
              </span>
            </dt>
            <dd>{discountEntity.subject8}</dd>
            <dt>
              <span id="quarterly">
                <Translate contentKey="risingArjunApp.discount.quarterly">Quarterly</Translate>
              </span>
            </dt>
            <dd>{discountEntity.quarterly}</dd>
            <dt>
              <span id="halfYearly">
                <Translate contentKey="risingArjunApp.discount.halfYearly">Half Yearly</Translate>
              </span>
            </dt>
            <dd>{discountEntity.halfYearly}</dd>
            <dt>
              <span id="annually">
                <Translate contentKey="risingArjunApp.discount.annually">Annually</Translate>
              </span>
            </dt>
            <dd>{discountEntity.annually}</dd>
            <dt>
              <span id="sibling">
                <Translate contentKey="risingArjunApp.discount.sibling">Sibling</Translate>
              </span>
            </dt>
            <dd>{discountEntity.sibling}</dd>
            <dt>
              <span id="referral">
                <Translate contentKey="risingArjunApp.discount.referral">Referral</Translate>
              </span>
            </dt>
            <dd>{discountEntity.referral}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.discount.enterprise">Enterprise</Translate>
            </dt>
            <dd>{discountEntity.enterpriseEnterprisename ? discountEntity.enterpriseEnterprisename : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.discount.session">Session</Translate>
            </dt>
            <dd>{discountEntity.sessionAcadSession ? discountEntity.sessionAcadSession : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/discount-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/discount-my-suffix/${discountEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ discount }: IRootState) => ({
  discountEntity: discount.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscountMySuffixDetail);
