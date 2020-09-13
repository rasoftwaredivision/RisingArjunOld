import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './center-my-suffix.reducer';
import { ICenterMySuffix } from 'app/shared/model/center-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICenterMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CenterMySuffixDetail extends React.Component<ICenterMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { centerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.center.detail.title">Center</Translate> [<b>{centerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="centerCode">
                <Translate contentKey="risingArjunApp.center.centerCode">Center Code</Translate>
              </span>
            </dt>
            <dd>{centerEntity.centerCode}</dd>
            <dt>
              <span id="centerTitle">
                <Translate contentKey="risingArjunApp.center.centerTitle">Center Title</Translate>
              </span>
            </dt>
            <dd>{centerEntity.centerTitle}</dd>
            <dt>
              <span id="street">
                <Translate contentKey="risingArjunApp.center.street">Street</Translate>
              </span>
            </dt>
            <dd>{centerEntity.street}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="risingArjunApp.center.city">City</Translate>
              </span>
            </dt>
            <dd>{centerEntity.city}</dd>
            <dt>
              <span id="state">
                <Translate contentKey="risingArjunApp.center.state">State</Translate>
              </span>
            </dt>
            <dd>{centerEntity.state}</dd>
            <dt>
              <span id="country">
                <Translate contentKey="risingArjunApp.center.country">Country</Translate>
              </span>
            </dt>
            <dd>{centerEntity.country}</dd>
            <dt>
              <span id="pincode">
                <Translate contentKey="risingArjunApp.center.pincode">Pincode</Translate>
              </span>
            </dt>
            <dd>{centerEntity.pincode}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.center.enterprise">Enterprise</Translate>
            </dt>
            <dd>{centerEntity.enterpriseEnterprisename ? centerEntity.enterpriseEnterprisename : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/center-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/center-my-suffix/${centerEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ center }: IRootState) => ({
  centerEntity: center.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenterMySuffixDetail);
