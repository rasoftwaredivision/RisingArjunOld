import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStudentsubjectMySuffix } from 'app/shared/model/studentsubject-my-suffix.model';
import { getEntities as getStudentsubjects } from 'app/entities/studentsubject-my-suffix/studentsubject-my-suffix.reducer';
import { ITeacherMySuffix } from 'app/shared/model/teacher-my-suffix.model';
import { getEntities as getTeachers } from 'app/entities/teacher-my-suffix/teacher-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './subject-my-suffix.reducer';
import { ISubjectMySuffix } from 'app/shared/model/subject-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISubjectMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISubjectMySuffixUpdateState {
  isNew: boolean;
  studentsubjectId: string;
  teachersId: string;
}

export class SubjectMySuffixUpdate extends React.Component<ISubjectMySuffixUpdateProps, ISubjectMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      studentsubjectId: '0',
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

    this.props.getStudentsubjects();
    this.props.getTeachers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { subjectEntity } = this.props;
      const entity = {
        ...subjectEntity,
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
    this.props.history.push('/entity/subject-my-suffix');
  };

  render() {
    const { subjectEntity, studentsubjects, teachers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.subject.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.subject.home.createOrEditLabel">Create or edit a Subject</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : subjectEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="subject-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="subject-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="subjectCodeLabel" for="subject-my-suffix-subjectCode">
                    <Translate contentKey="risingArjunApp.subject.subjectCode">Subject Code</Translate>
                  </Label>
                  <AvField
                    id="subject-my-suffix-subjectCode"
                    type="text"
                    name="subjectCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="subjectTitleLabel" for="subject-my-suffix-subjectTitle">
                    <Translate contentKey="risingArjunApp.subject.subjectTitle">Subject Title</Translate>
                  </Label>
                  <AvField
                    id="subject-my-suffix-subjectTitle"
                    type="text"
                    name="subjectTitle"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/subject-my-suffix" replace color="info">
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
  studentsubjects: storeState.studentsubject.entities,
  teachers: storeState.teacher.entities,
  subjectEntity: storeState.subject.entity,
  loading: storeState.subject.loading,
  updating: storeState.subject.updating,
  updateSuccess: storeState.subject.updateSuccess
});

const mapDispatchToProps = {
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
)(SubjectMySuffixUpdate);
