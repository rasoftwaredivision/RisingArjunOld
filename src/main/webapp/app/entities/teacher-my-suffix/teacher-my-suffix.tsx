import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './teacher-my-suffix.reducer';
import { ITeacherMySuffix } from 'app/shared/model/teacher-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeacherMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class TeacherMySuffix extends React.Component<ITeacherMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { teacherList, match } = this.props;
    return (
      <div>
        <h2 id="teacher-my-suffix-heading">
          <Translate contentKey="risingArjunApp.teacher.home.title">Teachers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.teacher.home.createLabel">Create new Teacher</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {teacherList && teacherList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.teacher.teacherId">Teacher Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.teacher.subjects">Subjects</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.teacher.courses">Courses</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {teacherList.map((teacher, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${teacher.id}`} color="link" size="sm">
                        {teacher.id}
                      </Button>
                    </td>
                    <td>
                      {teacher.teacherIdEmployeeId ? (
                        <Link to={`employee-my-suffix/${teacher.teacherIdId}`}>{teacher.teacherIdEmployeeId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {teacher.subjects
                        ? teacher.subjects.map((val, j) => (
                            <span key={j}>
                              <Link to={`subject-my-suffix/${val.id}`}>{val.subjectTitle}</Link>
                              {j === teacher.subjects.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {teacher.courses
                        ? teacher.courses.map((val, j) => (
                            <span key={j}>
                              <Link to={`course-my-suffix/${val.id}`}>{val.course}</Link>
                              {j === teacher.courses.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${teacher.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${teacher.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${teacher.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.teacher.home.notFound">No Teachers found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ teacher }: IRootState) => ({
  teacherList: teacher.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherMySuffix);
