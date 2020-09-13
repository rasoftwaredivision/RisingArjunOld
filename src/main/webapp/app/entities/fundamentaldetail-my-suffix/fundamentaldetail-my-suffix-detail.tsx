import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './fundamentaldetail-my-suffix.reducer';
import { IFundamentaldetailMySuffix } from 'app/shared/model/fundamentaldetail-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFundamentaldetailMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FundamentaldetailMySuffixDetail extends React.Component<IFundamentaldetailMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { fundamentaldetailEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.fundamentaldetail.detail.title">Fundamentaldetail</Translate> [
            <b>{fundamentaldetailEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="concept">
                <Translate contentKey="risingArjunApp.fundamentaldetail.concept">Concept</Translate>
              </span>
            </dt>
            <dd>{fundamentaldetailEntity.concept}</dd>
            <dt>
              <span id="details">
                <Translate contentKey="risingArjunApp.fundamentaldetail.details">Details</Translate>
              </span>
            </dt>
            <dd>{fundamentaldetailEntity.details}</dd>
          </dl>
          <Button tag={Link} to="/entity/fundamentaldetail-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/fundamentaldetail-my-suffix/${fundamentaldetailEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ fundamentaldetail }: IRootState) => ({
  fundamentaldetailEntity: fundamentaldetail.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundamentaldetailMySuffixDetail);
