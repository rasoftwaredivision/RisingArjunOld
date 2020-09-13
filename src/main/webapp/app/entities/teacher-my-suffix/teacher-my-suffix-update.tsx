import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { getEntities as getEmployees } from 'app/entities/employee-my-suffix/employee-my-suffix.reducer';
import { ISubjectMySuffix } from 'app/shared/model/subject-my-suffix.model';
import { getEntities as getSubjects } from 'app/entities/subject-my-suffix/subject-my-suffix.reducer';
import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';
import { getEntities as getCourses } from 'app/entities/course-my-suffix/course-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './teacher-my-suffix.reducer';
import { ITeacherMySuffix } from 'app/shared/model/teacher-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITeacherMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITeacherMySuffixUpdateState {
  isNew: boolean;
  idssubjects: any[];
  idscourses: any[];
  teacherIdId: string;
}

export class TeacherMySuffixUpdate extends React.Component<ITeacherMySuffixUpdateProps, ITeacherMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idssubjects: [],
      idscourses: [],
      teacherIdId: '0',
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

    this.props.getEmployees();
    this.props.getSubjects();
    this.props.getCourses();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { teacherEntity } = this.props;
      const entity = {
        ...teacherEntity,
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
    this.props.history.push('/entity/teacher-my-suffix');
  };

  render() {
    const { teacherEntity, employees, subjects, courses, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.teacher.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.teacher.home.createOrEditLabel">Create or edit a Teacher</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : teacherEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="teacher-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="teacher-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label for="teacher-my-suffix-teacherId">
                    <Translate contentKey="risingArjunApp.teacher.teacherId">Teacher Id</Translate>
                  </Label>
                  <AvInput id="teacher-my-suffix-teacherId" type="select" className="form-control" name="teacherIdId">
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.employeeId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="teacher-my-suffix-subjects">
                    <Translate contentKey="risingArjunApp.teacher.subjects">Subjects</Translate>
                  </Label>
                  <AvInput
                    id="teacher-my-suffix-subjects"
                    type="select"
                    multiple
                    className="form-control"
                    name="subjects"
                    value={teacherEntity.subjects && teacherEntity.subjects.map(e => e.id)}
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
                  <Label for="teacher-my-suffix-courses">
                    <Translate contentKey="risingArjunApp.teacher.courses">Courses</Translate>
                  </Label>
                  <AvInput
                    id="teacher-my-suffix-courses"
                    type="select"
                    multiple
                    className="form-control"
                    name="courses"
                    value={teacherEntity.courses && teacherEntity.courses.map(e => e.id)}
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
                <Button tag={Link} id="cancel-save" to="/entity/teacher-my-suffix" replace color="info">
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
  employees: storeState.employee.entities,
  subjects: storeState.subject.entities,
  courses: storeState.course.entities,
  teacherEntity: storeState.teacher.entity,
  loading: storeState.teacher.loading,
  updating: storeState.teacher.updating,
  updateSuccess: storeState.teacher.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
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
)(TeacherMySuffixUpdate);
