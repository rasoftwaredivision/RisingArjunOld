import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './studentsubject-my-suffix.reducer';
import { IStudentsubjectMySuffix } from 'app/shared/model/studentsubject-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStudentsubjectMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class StudentsubjectMySuffix extends React.Component<IStudentsubjectMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { studentsubjectList, match } = this.props;
    return (
      <div>
        <h2 id="studentsubject-my-suffix-heading">
          <Translate contentKey="risingArjunApp.studentsubject.home.title">Studentsubjects</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.studentsubject.home.createLabel">Create new Studentsubject</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {studentsubjectList && studentsubjectList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.studentsubject.month">Month</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.studentsubject.registrationno">Registrationno</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.studentsubject.session">Session</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.studentsubject.subjects">Subjects</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.studentsubject.course">Course</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {studentsubjectList.map((studentsubject, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${studentsubject.id}`} color="link" size="sm">
                        {studentsubject.id}
                      </Button>
                    </td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Month.${studentsubject.month}`} />
                    </td>
                    <td>
                      {studentsubject.registrationnoStudentRegId ? (
                        <Link to={`student-my-suffix/${studentsubject.registrationnoId}`}>{studentsubject.registrationnoStudentRegId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {studentsubject.sessionAcadSession ? (
                        <Link to={`academicsession-my-suffix/${studentsubject.sessionId}`}>{studentsubject.sessionAcadSession}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {studentsubject.subjects
                        ? studentsubject.subjects.map((val, j) => (
                            <span key={j}>
                              <Link to={`subject-my-suffix/${val.id}`}>{val.subjectTitle}</Link>
                              {j === studentsubject.subjects.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {studentsubject.courses
                        ? studentsubject.courses.map((val, j) => (
                            <span key={j}>
                              <Link to={`course-my-suffix/${val.id}`}>{val.course}</Link>
                              {j === studentsubject.courses.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${studentsubject.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${studentsubject.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${studentsubject.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="risingArjunApp.studentsubject.home.notFound">No Studentsubjects found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ studentsubject }: IRootState) => ({
  studentsubjectList: studentsubject.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsubjectMySuffix);
