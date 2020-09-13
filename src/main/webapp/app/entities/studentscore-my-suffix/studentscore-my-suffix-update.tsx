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
import { IQuestionMySuffix } from 'app/shared/model/question-my-suffix.model';
import { getEntities as getQuestions } from 'app/entities/question-my-suffix/question-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './studentscore-my-suffix.reducer';
import { IStudentscoreMySuffix } from 'app/shared/model/studentscore-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStudentscoreMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IStudentscoreMySuffixUpdateState {
  isNew: boolean;
  studentId: string;
  questionId: string;
}

export class StudentscoreMySuffixUpdate extends React.Component<IStudentscoreMySuffixUpdateProps, IStudentscoreMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      studentId: '0',
      questionId: '0',
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
    this.props.getQuestions();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { studentscoreEntity } = this.props;
      const entity = {
        ...studentscoreEntity,
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
    this.props.history.push('/entity/studentscore-my-suffix');
  };

  render() {
    const { studentscoreEntity, students, questions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.studentscore.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.studentscore.home.createOrEditLabel">Create or edit a Studentscore</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : studentscoreEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="studentscore-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="studentscore-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="answerLabel" for="studentscore-my-suffix-answer">
                    <Translate contentKey="risingArjunApp.studentscore.answer">Answer</Translate>
                  </Label>
                  <AvField
                    id="studentscore-my-suffix-answer"
                    type="text"
                    name="answer"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="scoreLabel" for="studentscore-my-suffix-score">
                    <Translate contentKey="risingArjunApp.studentscore.score">Score</Translate>
                  </Label>
                  <AvField
                    id="studentscore-my-suffix-score"
                    type="string"
                    className="form-control"
                    name="score"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="studentscore-my-suffix-date">
                    <Translate contentKey="risingArjunApp.studentscore.date">Date</Translate>
                  </Label>
                  <AvField
                    id="studentscore-my-suffix-date"
                    type="date"
                    className="form-control"
                    name="date"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="studentscore-my-suffix-student">
                    <Translate contentKey="risingArjunApp.studentscore.student">Student</Translate>
                  </Label>
                  <AvInput id="studentscore-my-suffix-student" type="select" className="form-control" name="studentId">
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
                  <Label for="studentscore-my-suffix-question">
                    <Translate contentKey="risingArjunApp.studentscore.question">Question</Translate>
                  </Label>
                  <AvInput id="studentscore-my-suffix-question" type="select" className="form-control" name="questionId">
                    <option value="" key="0" />
                    {questions
                      ? questions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.question}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/studentscore-my-suffix" replace color="info">
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
  questions: storeState.question.entities,
  studentscoreEntity: storeState.studentscore.entity,
  loading: storeState.studentscore.loading,
  updating: storeState.studentscore.updating,
  updateSuccess: storeState.studentscore.updateSuccess
});

const mapDispatchToProps = {
  getStudents,
  getQuestions,
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
)(StudentscoreMySuffixUpdate);
