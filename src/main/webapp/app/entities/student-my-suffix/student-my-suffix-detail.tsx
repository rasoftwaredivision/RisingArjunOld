import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './student-my-suffix.reducer';
import { IStudentMySuffix } from 'app/shared/model/student-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStudentMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StudentMySuffixDetail extends React.Component<IStudentMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { studentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.student.detail.title">Student</Translate> [<b>{studentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="studentRegId">
                <Translate contentKey="risingArjunApp.student.studentRegId">Student Reg Id</Translate>
              </span>
            </dt>
            <dd>{studentEntity.studentRegId}</dd>
            <dt>
              <span id="registrationForm">
                <Translate contentKey="risingArjunApp.student.registrationForm">Registration Form</Translate>
              </span>
            </dt>
            <dd>
              {studentEntity.registrationForm ? (
                <div>
                  <a onClick={openFile(studentEntity.registrationFormContentType, studentEntity.registrationForm)}>
                    <img
                      src={`data:${studentEntity.registrationFormContentType};base64,${studentEntity.registrationForm}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {studentEntity.registrationFormContentType}, {byteSize(studentEntity.registrationForm)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="parentMobNo1">
                <Translate contentKey="risingArjunApp.student.parentMobNo1">Parent Mob No 1</Translate>
              </span>
            </dt>
            <dd>{studentEntity.parentMobNo1}</dd>
            <dt>
              <span id="parentMobNo2">
                <Translate contentKey="risingArjunApp.student.parentMobNo2">Parent Mob No 2</Translate>
              </span>
            </dt>
            <dd>{studentEntity.parentMobNo2}</dd>
            <dt>
              <span id="parentEmailId">
                <Translate contentKey="risingArjunApp.student.parentEmailId">Parent Email Id</Translate>
              </span>
            </dt>
            <dd>{studentEntity.parentEmailId}</dd>
            <dt>
              <span id="studentStatus">
                <Translate contentKey="risingArjunApp.student.studentStatus">Student Status</Translate>
              </span>
            </dt>
            <dd>{studentEntity.studentStatus}</dd>
            <dt>
              <span id="leavingReason">
                <Translate contentKey="risingArjunApp.student.leavingReason">Leaving Reason</Translate>
              </span>
            </dt>
            <dd>{studentEntity.leavingReason}</dd>
            <dt>
              <span id="infoSource">
                <Translate contentKey="risingArjunApp.student.infoSource">Info Source</Translate>
              </span>
            </dt>
            <dd>{studentEntity.infoSource}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.student.user">User</Translate>
            </dt>
            <dd>{studentEntity.userLogin ? studentEntity.userLogin : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.student.course">Course</Translate>
            </dt>
            <dd>
              {studentEntity.courses
                ? studentEntity.courses.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.course}</a>
                      {i === studentEntity.courses.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/student-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/student-my-suffix/${studentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ student }: IRootState) => ({
  studentEntity: student.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentMySuffixDetail);
