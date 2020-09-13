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
import { IStudentsubjectMySuffix } from 'app/shared/model/studentsubject-my-suffix.model';
import { getEntities as getStudentsubjects } from 'app/entities/studentsubject-my-suffix/studentsubject-my-suffix.reducer';
import { ITeacherMySuffix } from 'app/shared/model/teacher-my-suffix.model';
import { getEntities as getTeachers } from 'app/entities/teacher-my-suffix/teacher-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './course-my-suffix.reducer';
import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICourseMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICourseMySuffixUpdateState {
  isNew: boolean;
  studentId: string;
  studentsubjectsId: string;
  teachersId: string;
}

export class CourseMySuffixUpdate extends React.Component<ICourseMySuffixUpdateProps, ICourseMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      studentId: '0',
      studentsubjectsId: '0',
      teachersId: '0',
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
    this.props.getStudentsubjects();
    this.props.getTeachers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { courseEntity } = this.props;
      const entity = {
        ...courseEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/course-my-suffix');
  };

  render() {
    const { courseEntity, students, studentsubjects, teachers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.course.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.course.home.createOrEditLabel">Create or edit a Course</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : courseEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="course-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="course-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="courseIdLabel" for="course-my-suffix-courseId">
                    <Translate contentKey="risingArjunApp.course.courseId">Course Id</Translate>
                  </Label>
                  <AvField
                    id="course-my-suffix-courseId"
                    type="text"
                    name="courseId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="courseLabel" for="course-my-suffix-course">
                    <Translate contentKey="risingArjunApp.course.course">Course</Translate>
                  </Label>
                  <AvField
                    id="course-my-suffix-course"
                    type="text"
                    name="course"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/course-my-suffix" replace color="info">
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
  studentsubjects: storeState.studentsubject.entities,
  teachers: storeState.teacher.entities,
  courseEntity: storeState.course.entity,
  loading: storeState.course.loading,
  updating: storeState.course.updating,
  updateSuccess: storeState.course.updateSuccess
});

const mapDispatchToProps = {
  getStudents,
  getStudentsubjects,
  getTeachers,
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
)(CourseMySuffixUpdate);
