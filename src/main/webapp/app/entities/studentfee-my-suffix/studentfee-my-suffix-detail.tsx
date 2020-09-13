import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './studentfee-my-suffix.reducer';
import { IStudentfeeMySuffix } from 'app/shared/model/studentfee-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStudentfeeMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StudentfeeMySuffixDetail extends React.Component<IStudentfeeMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { studentfeeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.studentfee.detail.title">Studentfee</Translate> [<b>{studentfeeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="fee">
                <Translate contentKey="risingArjunApp.studentfee.fee">Fee</Translate>
              </span>
            </dt>
            <dd>{studentfeeEntity.fee}</dd>
            <dt>
              <span id="feeCorrection">
                <Translate contentKey="risingArjunApp.studentfee.feeCorrection">Fee Correction</Translate>
              </span>
            </dt>
            <dd>{studentfeeEntity.feeCorrection}</dd>
            <dt>
              <span id="month">
                <Translate contentKey="risingArjunApp.studentfee.month">Month</Translate>
              </span>
            </dt>
            <dd>{studentfeeEntity.month}</dd>
            <dt>
              <span id="feeStatus">
                <Translate contentKey="risingArjunApp.studentfee.feeStatus">Fee Status</Translate>
              </span>
            </dt>
            <dd>{studentfeeEntity.feeStatus ? 'true' : 'false'}</dd>
            <dt>
              <span id="remarks">
                <Translate contentKey="risingArjunApp.studentfee.remarks">Remarks</Translate>
              </span>
            </dt>
            <dd>{studentfeeEntity.remarks}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.studentfee.registrationno">Registrationno</Translate>
            </dt>
            <dd>{studentfeeEntity.registrationnoStudentRegId ? studentfeeEntity.registrationnoStudentRegId : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.studentfee.subject">Subject</Translate>
            </dt>
            <dd>{studentfeeEntity.subjectSubjectTitle ? studentfeeEntity.subjectSubjectTitle : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.studentfee.session">Session</Translate>
            </dt>
            <dd>{studentfeeEntity.sessionAcadSession ? studentfeeEntity.sessionAcadSession : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.studentfee.teacher">Teacher</Translate>
            </dt>
            <dd>{studentfeeEntity.teacherEmployeeId ? studentfeeEntity.teacherEmployeeId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/studentfee-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/studentfee-my-suffix/${studentfeeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ studentfee }: IRootState) => ({
  studentfeeEntity: studentfee.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentfeeMySuffixDetail);
