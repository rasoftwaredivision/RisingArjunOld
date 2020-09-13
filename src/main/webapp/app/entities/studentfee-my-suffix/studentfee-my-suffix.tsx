import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './studentfee-my-suffix.reducer';
import { IStudentfeeMySuffix } from 'app/shared/model/studentfee-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IStudentfeeMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IStudentfeeMySuffixState = IPaginationBaseState;

export class StudentfeeMySuffix extends React.Component<IStudentfeeMySuffixProps, IStudentfeeMySuffixState> {
  state: IStudentfeeMySuffixState = {
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
    const { studentfeeList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="studentfee-my-suffix-heading">
          <Translate contentKey="risingArjunApp.studentfee.home.title">Studentfees</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.studentfee.home.createLabel">Create new Studentfee</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {studentfeeList && studentfeeList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('fee')}>
                    <Translate contentKey="risingArjunApp.studentfee.fee">Fee</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('feeCorrection')}>
                    <Translate contentKey="risingArjunApp.studentfee.feeCorrection">Fee Correction</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('month')}>
                    <Translate contentKey="risingArjunApp.studentfee.month">Month</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('feeStatus')}>
                    <Translate contentKey="risingArjunApp.studentfee.feeStatus">Fee Status</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('remarks')}>
                    <Translate contentKey="risingArjunApp.studentfee.remarks">Remarks</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.studentfee.registrationno">Registrationno</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.studentfee.subject">Subject</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.studentfee.session">Session</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.studentfee.teacher">Teacher</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {studentfeeList.map((studentfee, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${studentfee.id}`} color="link" size="sm">
                        {studentfee.id}
                      </Button>
                    </td>
                    <td>{studentfee.fee}</td>
                    <td>{studentfee.feeCorrection}</td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Month.${studentfee.month}`} />
                    </td>
                    <td>{studentfee.feeStatus ? 'true' : 'false'}</td>
                    <td>{studentfee.remarks}</td>
                    <td>
                      {studentfee.registrationnoStudentRegId ? (
                        <Link to={`student-my-suffix/${studentfee.registrationnoId}`}>{studentfee.registrationnoStudentRegId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {studentfee.subjectSubjectTitle ? (
                        <Link to={`subject-my-suffix/${studentfee.subjectId}`}>{studentfee.subjectSubjectTitle}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {studentfee.sessionAcadSession ? (
                        <Link to={`academicsession-my-suffix/${studentfee.sessionId}`}>{studentfee.sessionAcadSession}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {studentfee.teacherEmployeeId ? (
                        <Link to={`employee-my-suffix/${studentfee.teacherId}`}>{studentfee.teacherEmployeeId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${studentfee.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${studentfee.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${studentfee.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.studentfee.home.notFound">No Studentfees found</Translate>
            </div>
          )}
        </div>
        <div className={studentfeeList && studentfeeList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ studentfee }: IRootState) => ({
  studentfeeList: studentfee.entities,
  totalItems: studentfee.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentfeeMySuffix);
