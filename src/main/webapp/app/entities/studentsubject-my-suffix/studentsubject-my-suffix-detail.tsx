import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './studentsubject-my-suffix.reducer';
import { IStudentsubjectMySuffix } from 'app/shared/model/studentsubject-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStudentsubjectMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StudentsubjectMySuffixDetail extends React.Component<IStudentsubjectMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { studentsubjectEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.studentsubject.detail.title">Studentsubject</Translate> [<b>{studentsubjectEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="month">
                <Translate contentKey="risingArjunApp.studentsubject.month">Month</Translate>
              </span>
            </dt>
            <dd>{studentsubjectEntity.month}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.studentsubject.registrationno">Registrationno</Translate>
            </dt>
            <dd>{studentsubjectEntity.registrationnoStudentRegId ? studentsubjectEntity.registrationnoStudentRegId : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.studentsubject.session">Session</Translate>
            </dt>
            <dd>{studentsubjectEntity.sessionAcadSession ? studentsubjectEntity.sessionAcadSession : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.studentsubject.subjects">Subjects</Translate>
            </dt>
            <dd>
              {studentsubjectEntity.subjects
                ? studentsubjectEntity.subjects.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.subjectTitle}</a>
                      {i === studentsubjectEntity.subjects.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="risingArjunApp.studentsubject.course">Course</Translate>
            </dt>
            <dd>
              {studentsubjectEntity.courses
                ? studentsubjectEntity.courses.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.course}</a>
                      {i === studentsubjectEntity.courses.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/studentsubject-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/studentsubject-my-suffix/${studentsubjectEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ studentsubject }: IRootState) => ({
  studentsubjectEntity: studentsubject.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsubjectMySuffixDetail);
