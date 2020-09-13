import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './teacher-my-suffix.reducer';
import { ITeacherMySuffix } from 'app/shared/model/teacher-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeacherMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TeacherMySuffixDetail extends React.Component<ITeacherMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { teacherEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.teacher.detail.title">Teacher</Translate> [<b>{teacherEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <Translate contentKey="risingArjunApp.teacher.teacherId">Teacher Id</Translate>
            </dt>
            <dd>{teacherEntity.teacherIdEmployeeId ? teacherEntity.teacherIdEmployeeId : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.teacher.subjects">Subjects</Translate>
            </dt>
            <dd>
              {teacherEntity.subjects
                ? teacherEntity.subjects.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.subjectTitle}</a>
                      {i === teacherEntity.subjects.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="risingArjunApp.teacher.courses">Courses</Translate>
            </dt>
            <dd>
              {teacherEntity.courses
                ? teacherEntity.courses.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.course}</a>
                      {i === teacherEntity.courses.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/teacher-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/teacher-my-suffix/${teacherEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ teacher }: IRootState) => ({
  teacherEntity: teacher.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherMySuffixDetail);
