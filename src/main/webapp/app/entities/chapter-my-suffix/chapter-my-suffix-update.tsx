import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';
import { getEntities as getCourses } from 'app/entities/course-my-suffix/course-my-suffix.reducer';
import { ISubjectMySuffix } from 'app/shared/model/subject-my-suffix.model';
import { getEntities as getSubjects } from 'app/entities/subject-my-suffix/subject-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './chapter-my-suffix.reducer';
import { IChapterMySuffix } from 'app/shared/model/chapter-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChapterMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IChapterMySuffixUpdateState {
  isNew: boolean;
  courseId: string;
  subjectId: string;
}

export class ChapterMySuffixUpdate extends React.Component<IChapterMySuffixUpdateProps, IChapterMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      courseId: '0',
      subjectId: '0',
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

    this.props.getCourses();
    this.props.getSubjects();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { chapterEntity } = this.props;
      const entity = {
        ...chapterEntity,
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
    this.props.history.push('/entity/chapter-my-suffix');
  };

  render() {
    const { chapterEntity, courses, subjects, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.chapter.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.chapter.home.createOrEditLabel">Create or edit a Chapter</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : chapterEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="chapter-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="chapter-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="chapterIdLabel" for="chapter-my-suffix-chapterId">
                    <Translate contentKey="risingArjunApp.chapter.chapterId">Chapter Id</Translate>
                  </Label>
                  <AvField
                    id="chapter-my-suffix-chapterId"
                    type="text"
                    name="chapterId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="chapterTitleLabel" for="chapter-my-suffix-chapterTitle">
                    <Translate contentKey="risingArjunApp.chapter.chapterTitle">Chapter Title</Translate>
                  </Label>
                  <AvField id="chapter-my-suffix-chapterTitle" type="text" name="chapterTitle" />
                </AvGroup>
                <AvGroup>
                  <Label for="chapter-my-suffix-course">
                    <Translate contentKey="risingArjunApp.chapter.course">Course</Translate>
                  </Label>
                  <AvInput id="chapter-my-suffix-course" type="select" className="form-control" name="courseId">
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
                <AvGroup>
                  <Label for="chapter-my-suffix-subject">
                    <Translate contentKey="risingArjunApp.chapter.subject">Subject</Translate>
                  </Label>
                  <AvInput id="chapter-my-suffix-subject" type="select" className="form-control" name="subjectId">
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
                <Button tag={Link} id="cancel-save" to="/entity/chapter-my-suffix" replace color="info">
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
  courses: storeState.course.entities,
  subjects: storeState.subject.entities,
  chapterEntity: storeState.chapter.entity,
  loading: storeState.chapter.loading,
  updating: storeState.chapter.updating,
  updateSuccess: storeState.chapter.updateSuccess
});

const mapDispatchToProps = {
  getCourses,
  getSubjects,
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
)(ChapterMySuffixUpdate);
