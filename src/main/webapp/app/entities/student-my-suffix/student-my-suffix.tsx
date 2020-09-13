import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  openFile,
  byteSize,
  Translate,
  ICrudGetAllAction,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './student-my-suffix.reducer';
import { IStudentMySuffix } from 'app/shared/model/student-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IStudentMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IStudentMySuffixState = IPaginationBaseState;

export class StudentMySuffix extends React.Component<IStudentMySuffixProps, IStudentMySuffixState> {
  state: IStudentMySuffixState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { studentList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="student-my-suffix-heading">
          <Translate contentKey="risingArjunApp.student.home.title">Students</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.student.home.createLabel">Create new Student</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {studentList && studentList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('studentRegId')}>
                    <Translate contentKey="risingArjunApp.student.studentRegId">Student Reg Id</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('registrationForm')}>
                    <Translate contentKey="risingArjunApp.student.registrationForm">Registration Form</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('parentMobNo1')}>
                    <Translate contentKey="risingArjunApp.student.parentMobNo1">Parent Mob No 1</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('parentMobNo2')}>
                    <Translate contentKey="risingArjunApp.student.parentMobNo2">Parent Mob No 2</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('parentEmailId')}>
                    <Translate contentKey="risingArjunApp.student.parentEmailId">Parent Email Id</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('studentStatus')}>
                    <Translate contentKey="risingArjunApp.student.studentStatus">Student Status</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('leavingReason')}>
                    <Translate contentKey="risingArjunApp.student.leavingReason">Leaving Reason</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('infoSource')}>
                    <Translate contentKey="risingArjunApp.student.infoSource">Info Source</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.student.user">User</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {studentList.map((student, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${student.id}`} color="link" size="sm">
                        {student.id}
                      </Button>
                    </td>
                    <td>{student.studentRegId}</td>
                    <td>
                      {student.registrationForm ? (
                        <div>
                          <a onClick={openFile(student.registrationFormContentType, student.registrationForm)}>
                            <img
                              src={`data:${student.registrationFormContentType};base64,${student.registrationForm}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {student.registrationFormContentType}, {byteSize(student.registrationForm)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{student.parentMobNo1}</td>
                    <td>{student.parentMobNo2}</td>
                    <td>{student.parentEmailId}</td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Studentstatus.${student.studentStatus}`} />
                    </td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Leavingreason.${student.leavingReason}`} />
                    </td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Infosource.${student.infoSource}`} />
                    </td>
                    <td>{student.userLogin ? student.userLogin : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${student.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${student.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${student.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.student.home.notFound">No Students found</Translate>
            </div>
          )}
        </div>
        <div className={studentList && studentList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ student }: IRootState) => ({
  studentList: student.entities,
  totalItems: student.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentMySuffix);
