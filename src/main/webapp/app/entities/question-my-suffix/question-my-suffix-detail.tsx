import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './question-my-suffix.reducer';
import { IQuestionMySuffix } from 'app/shared/model/question-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuestionMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class QuestionMySuffixDetail extends React.Component<IQuestionMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { questionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.question.detail.title">Question</Translate> [<b>{questionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="question">
                <Translate contentKey="risingArjunApp.question.question">Question</Translate>
              </span>
            </dt>
            <dd>{questionEntity.question}</dd>
            <dt>
              <span id="diagram">
                <Translate contentKey="risingArjunApp.question.diagram">Diagram</Translate>
              </span>
            </dt>
            <dd>
              {questionEntity.diagram ? (
                <div>
                  <a onClick={openFile(questionEntity.diagramContentType, questionEntity.diagram)}>
                    <img src={`data:${questionEntity.diagramContentType};base64,${questionEntity.diagram}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {questionEntity.diagramContentType}, {byteSize(questionEntity.diagram)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="option1">
                <Translate contentKey="risingArjunApp.question.option1">Option 1</Translate>
              </span>
            </dt>
            <dd>{questionEntity.option1}</dd>
            <dt>
              <span id="option2">
                <Translate contentKey="risingArjunApp.question.option2">Option 2</Translate>
              </span>
            </dt>
            <dd>{questionEntity.option2}</dd>
            <dt>
              <span id="option3">
                <Translate contentKey="risingArjunApp.question.option3">Option 3</Translate>
              </span>
            </dt>
            <dd>{questionEntity.option3}</dd>
            <dt>
              <span id="option4">
                <Translate contentKey="risingArjunApp.question.option4">Option 4</Translate>
              </span>
            </dt>
            <dd>{questionEntity.option4}</dd>
            <dt>
              <span id="multiChoice">
                <Translate contentKey="risingArjunApp.question.multiChoice">Multi Choice</Translate>
              </span>
            </dt>
            <dd>{questionEntity.multiChoice ? 'true' : 'false'}</dd>
            <dt>
              <span id="answer">
                <Translate contentKey="risingArjunApp.question.answer">Answer</Translate>
              </span>
            </dt>
            <dd>{questionEntity.answer}</dd>
            <dt>
              <span id="maxMarks">
                <Translate contentKey="risingArjunApp.question.maxMarks">Max Marks</Translate>
              </span>
            </dt>
            <dd>{questionEntity.maxMarks}</dd>
            <dt>
              <span id="negativeMarks">
                <Translate contentKey="risingArjunApp.question.negativeMarks">Negative Marks</Translate>
              </span>
            </dt>
            <dd>{questionEntity.negativeMarks}</dd>
            <dt>
              <span id="durationMins">
                <Translate contentKey="risingArjunApp.question.durationMins">Duration Mins</Translate>
              </span>
            </dt>
            <dd>{questionEntity.durationMins}</dd>
            <dt>
              <span id="level">
                <Translate contentKey="risingArjunApp.question.level">Level</Translate>
              </span>
            </dt>
            <dd>{questionEntity.level}</dd>
            <dt>
              <span id="solution">
                <Translate contentKey="risingArjunApp.question.solution">Solution</Translate>
              </span>
            </dt>
            <dd>{questionEntity.solution}</dd>
            <dt>
              <span id="video">
                <Translate contentKey="risingArjunApp.question.video">Video</Translate>
              </span>
            </dt>
            <dd>{questionEntity.video}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="risingArjunApp.question.status">Status</Translate>
              </span>
            </dt>
            <dd>{questionEntity.status}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.question.enterprise">Enterprise</Translate>
            </dt>
            <dd>{questionEntity.enterpriseEnterprisename ? questionEntity.enterpriseEnterprisename : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.question.course">Course</Translate>
            </dt>
            <dd>{questionEntity.courseCourse ? questionEntity.courseCourse : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.question.subject">Subject</Translate>
            </dt>
            <dd>{questionEntity.subjectSubjectTitle ? questionEntity.subjectSubjectTitle : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.question.chapter">Chapter</Translate>
            </dt>
            <dd>{questionEntity.chapterChapterTitle ? questionEntity.chapterChapterTitle : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.question.writer">Writer</Translate>
            </dt>
            <dd>{questionEntity.writerEmployeeId ? questionEntity.writerEmployeeId : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.question.approver">Approver</Translate>
            </dt>
            <dd>{questionEntity.approverEmployeeId ? questionEntity.approverEmployeeId : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.question.fundamentals">Fundamentals</Translate>
            </dt>
            <dd>
              {questionEntity.fundamentals
                ? questionEntity.fundamentals.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.details}</a>
                      {i === questionEntity.fundamentals.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/question-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/question-my-suffix/${questionEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ question }: IRootState) => ({
  questionEntity: question.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionMySuffixDetail);
