import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStudentMySuffix } from 'app/shared/model/student-my-suffix.model';
import { getEntities as getStudents } from 'app/entities/student-my-suffix/student-my-suffix.reducer';
import { IAcademicsessionMySuffix } from 'app/shared/model/academicsession-my-suffix.model';
import { getEntities as getAcademicsessions } from 'app/entities/academicsession-my-suffix/academicsession-my-suffix.reducer';
import { ISubjectMySuffix } from 'app/shared/model/subject-my-suffix.model';
import { getEntities as getSubjects } from 'app/entities/subject-my-suffix/subject-my-suffix.reducer';
import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';
import { getEntities as getCourses } from 'app/entities/course-my-suffix/course-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './studentsubject-my-suffix.reducer';
import { IStudentsubjectMySuffix } from 'app/shared/model/studentsubject-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStudentsubjectMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IStudentsubjectMySuffixUpdateState {
  isNew: boolean;
  idssubjects: any[];
  idscourse: any[];
  registrationnoId: string;
  sessionId: string;
}

export class StudentsubjectMySuffixUpdate extends React.Component<IStudentsubjectMySuffixUpdateProps, IStudentsubjectMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idssubjects: [],
      idscourse: [],
      registrationnoId: '0',
      sessionId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getStudents();
    this.props.getAcademicsessions();
    this.props.getSubjects();
    this.props.getCourses();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { studentsubjectEntity } = this.props;
      const entity = {
        ...studentsubjectEntity,
        ...values,
        subjects: mapIdList(values.subjects),
        courses: mapIdList(values.courses)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/studentsubject-my-suffix');
  };

  render() {
    const { studentsubjectEntity, students, academicsessions, subjects, courses, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.studentsubject.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.studentsubject.home.createOrEditLabel">Create or edit a Studentsubject</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : studentsubjectEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="studentsubject-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="studentsubject-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="monthLabel" for="studentsubject-my-suffix-month">
                    <Translate contentKey="risingArjunApp.studentsubject.month">Month</Translate>
                  </Label>
                  <AvInput
                    id="studentsubject-my-suffix-month"
                    type="select"
                    className="form-control"
                    name="month"
                    value={(!isNew && studentsubjectEntity.month) || 'JAN'}
                  >
                    <option value="JAN">{translate('risingArjunApp.Month.JAN')}</option>
                    <option value="FEB">{translate('risingArjunApp.Month.FEB')}</option>
                    <option value="MAR">{translate('risingArjunApp.Month.MAR')}</option>
                    <option value="APR">{translate('risingArjunApp.Month.APR')}</option>
                    <option value="MAY">{translate('risingArjunApp.Month.MAY')}</option>
                    <option value="JUN">{translate('risingArjunApp.Month.JUN')}</option>
                    <option value="JUL">{translate('risingArjunApp.Month.JUL')}</option>
                    <option value="AUG">{translate('risingArjunApp.Month.AUG')}</option>
                    <option value="SEP">{translate('risingArjunApp.Month.SEP')}</option>
                    <option value="OCT">{translate('risingArjunApp.Month.OCT')}</option>
                    <option value="NOV">{translate('risingArjunApp.Month.NOV')}</option>
                    <option value="DEC">{translate('risingArjunApp.Month.DEC')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="studentsubject-my-suffix-registrationno">
                    <Translate contentKey="risingArjunApp.studentsubject.registrationno">Registrationno</Translate>
                  </Label>
                  <AvInput id="studentsubject-my-suffix-registrationno" type="select" className="form-control" name="registrationnoId">
                    <option value="" key="0" />
                    {students
                      ? students.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.studentRegId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="studentsubject-my-suffix-session">
                    <Translate contentKey="risingArjunApp.studentsubject.session">Session</Translate>
                  </Label>
                  <AvInput id="studentsubject-my-suffix-session" type="select" className="form-control" name="sessionId">
                    <option value="" key="0" />
                    {academicsessions
                      ? academicsessions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.acadSession}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="studentsubject-my-suffix-subjects">
                    <Translate contentKey="risingArjunApp.studentsubject.subjects">Subjects</Translate>
                  </Label>
                  <AvInput
                    id="studentsubject-my-suffix-subjects"
                    type="select"
                    multiple
                    className="form-control"
                    name="subjects"
                    value={studentsubjectEntity.subjects && studentsubjectEntity.subjects.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {subjects
                      ? subjects.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.subjectTitle}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="studentsubject-my-suffix-course">
                    <Translate contentKey="risingArjunApp.studentsubject.course">Course</Translate>
                  </Label>
                  <AvInput
                    id="studentsubject-my-suffix-course"
                    type="select"
                    multiple
                    className="form-control"
                    name="courses"
                    value={studentsubjectEntity.courses && studentsubjectEntity.courses.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {courses
                      ? courses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.course}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/studentsubject-my-suffix" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  students: storeState.student.entities,
  academicsessions: storeState.academicsession.entities,
  subjects: storeState.subject.entities,
  courses: storeState.course.entities,
  studentsubjectEntity: storeState.studentsubject.entity,
  loading: storeState.studentsubject.loading,
  updating: storeState.studentsubject.updating,
  updateSuccess: storeState.studentsubject.updateSuccess
});

const mapDispatchToProps = {
  getStudents,
  getAcademicsessions,
  getSubjects,
  getCourses,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsubjectMySuffixUpdate);
