import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './teachershare-my-suffix.reducer';
import { ITeachershareMySuffix } from 'app/shared/model/teachershare-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeachershareMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TeachershareMySuffixDetail extends React.Component<ITeachershareMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { teachershareEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.teachershare.detail.title">Teachershare</Translate> [<b>{teachershareEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="sharePercent">
                <Translate contentKey="risingArjunApp.teachershare.sharePercent">Share Percent</Translate>
              </span>
            </dt>
            <dd>{teachershareEntity.sharePercent}</dd>
            <dt>
              <span id="plannedClasses">
                <Translate contentKey="risingArjunApp.teachershare.plannedClasses">Planned Classes</Translate>
              </span>
            </dt>
            <dd>{teachershareEntity.plannedClasses}</dd>
            <dt>
              <span id="actualClasses">
                <Translate contentKey="risingArjunApp.teachershare.actualClasses">Actual Classes</Translate>
              </span>
            </dt>
            <dd>{teachershareEntity.actualClasses}</dd>
            <dt>
              <span id="shareCorrection">
                <Translate contentKey="risingArjunApp.teachershare.shareCorrection">Share Correction</Translate>
              </span>
            </dt>
            <dd>{teachershareEntity.shareCorrection}</dd>
            <dt>
              <span id="share">
                <Translate contentKey="risingArjunApp.teachershare.share">Share</Translate>
              </span>
            </dt>
            <dd>{teachershareEntity.share}</dd>
            <dt>
              <span id="month">
                <Translate contentKey="risingArjunApp.teachershare.month">Month</Translate>
              </span>
            </dt>
            <dd>{teachershareEntity.month}</dd>
            <dt>
              <span id="remarks">
                <Translate contentKey="risingArjunApp.teachershare.remarks">Remarks</Translate>
              </span>
            </dt>
            <dd>{teachershareEntity.remarks}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.teachershare.teacherId">Teacher Id</Translate>
            </dt>
            <dd>{teachershareEntity.teacherIdEmployeeId ? teachershareEntity.teacherIdEmployeeId : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.teachershare.subject">Subject</Translate>
            </dt>
            <dd>{teachershareEntity.subjectSubjectTitle ? teachershareEntity.subjectSubjectTitle : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.teachershare.session">Session</Translate>
            </dt>
            <dd>{teachershareEntity.sessionAcadSessionId ? teachershareEntity.sessionAcadSessionId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/teachershare-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/teachershare-my-suffix/${teachershareEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ teachershare }: IRootState) => ({
  teachershareEntity: teachershare.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeachershareMySuffixDetail);
