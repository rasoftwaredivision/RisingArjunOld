import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './subjectsbasefee-my-suffix.reducer';
import { ISubjectsbasefeeMySuffix } from 'app/shared/model/subjectsbasefee-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubjectsbasefeeMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SubjectsbasefeeMySuffixDetail extends React.Component<ISubjectsbasefeeMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { subjectsbasefeeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.subjectsbasefee.detail.title">Subjectsbasefee</Translate> [
            <b>{subjectsbasefeeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="baseFee">
                <Translate contentKey="risingArjunApp.subjectsbasefee.baseFee">Base Fee</Translate>
              </span>
            </dt>
            <dd>{subjectsbasefeeEntity.baseFee}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.subjectsbasefee.course">Course</Translate>
            </dt>
            <dd>{subjectsbasefeeEntity.courseCourse ? subjectsbasefeeEntity.courseCourse : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.subjectsbasefee.enterprise">Enterprise</Translate>
            </dt>
            <dd>{subjectsbasefeeEntity.enterpriseEnterprisename ? subjectsbasefeeEntity.enterpriseEnterprisename : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.subjectsbasefee.session">Session</Translate>
            </dt>
            <dd>{subjectsbasefeeEntity.sessionAcadSession ? subjectsbasefeeEntity.sessionAcadSession : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/subjectsbasefee-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/subjectsbasefee-my-suffix/${subjectsbasefeeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ subjectsbasefee }: IRootState) => ({
  subjectsbasefeeEntity: subjectsbasefee.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectsbasefeeMySuffixDetail);
