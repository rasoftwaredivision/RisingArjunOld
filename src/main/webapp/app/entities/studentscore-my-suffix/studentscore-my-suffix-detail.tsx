import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './studentscore-my-suffix.reducer';
import { IStudentscoreMySuffix } from 'app/shared/model/studentscore-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStudentscoreMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StudentscoreMySuffixDetail extends React.Component<IStudentscoreMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { studentscoreEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.studentscore.detail.title">Studentscore</Translate> [<b>{studentscoreEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="answer">
                <Translate contentKey="risingArjunApp.studentscore.answer">Answer</Translate>
              </span>
            </dt>
            <dd>{studentscoreEntity.answer}</dd>
            <dt>
              <span id="score">
                <Translate contentKey="risingArjunApp.studentscore.score">Score</Translate>
              </span>
            </dt>
            <dd>{studentscoreEntity.score}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="risingArjunApp.studentscore.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={studentscoreEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="risingArjunApp.studentscore.student">Student</Translate>
            </dt>
            <dd>{studentscoreEntity.studentStudentRegId ? studentscoreEntity.studentStudentRegId : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.studentscore.question">Question</Translate>
            </dt>
            <dd>{studentscoreEntity.questionQuestion ? studentscoreEntity.questionQuestion : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/studentscore-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/studentscore-my-suffix/${studentscoreEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ studentscore }: IRootState) => ({
  studentscoreEntity: studentscore.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentscoreMySuffixDetail);
