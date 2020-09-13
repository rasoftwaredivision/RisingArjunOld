import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './feature-my-suffix.reducer';
import { IFeatureMySuffix } from 'app/shared/model/feature-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFeatureMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FeatureMySuffixDetail extends React.Component<IFeatureMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { featureEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.feature.detail.title">Feature</Translate> [<b>{featureEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="featureId">
                <Translate contentKey="risingArjunApp.feature.featureId">Feature Id</Translate>
              </span>
            </dt>
            <dd>{featureEntity.featureId}</dd>
            <dt>
              <span id="featureDetail">
                <Translate contentKey="risingArjunApp.feature.featureDetail">Feature Detail</Translate>
              </span>
            </dt>
            <dd>{featureEntity.featureDetail}</dd>
          </dl>
          <Button tag={Link} to="/entity/feature-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/feature-my-suffix/${featureEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ feature }: IRootState) => ({
  featureEntity: feature.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeatureMySuffixDetail);
