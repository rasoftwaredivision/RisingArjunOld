import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './academicsession-my-suffix.reducer';
import { IAcademicsessionMySuffix } from 'app/shared/model/academicsession-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAcademicsessionMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AcademicsessionMySuffixDetail extends React.Component<IAcademicsessionMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { academicsessionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.academicsession.detail.title">Academicsession</Translate> [
            <b>{academicsessionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="acadSessionId">
                <Translate contentKey="risingArjunApp.academicsession.acadSessionId">Acad Session Id</Translate>
              </span>
            </dt>
            <dd>{academicsessionEntity.acadSessionId}</dd>
            <dt>
              <span id="acadSession">
                <Translate contentKey="risingArjunApp.academicsession.acadSession">Acad Session</Translate>
              </span>
            </dt>
            <dd>{academicsessionEntity.acadSession}</dd>
          </dl>
          <Button tag={Link} to="/entity/academicsession-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/academicsession-my-suffix/${academicsessionEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ academicsession }: IRootState) => ({
  academicsessionEntity: academicsession.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcademicsessionMySuffixDetail);
