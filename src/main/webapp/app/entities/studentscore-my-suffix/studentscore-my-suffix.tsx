import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './studentscore-my-suffix.reducer';
import { IStudentscoreMySuffix } from 'app/shared/model/studentscore-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IStudentscoreMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IStudentscoreMySuffixState = IPaginationBaseState;

export class StudentscoreMySuffix extends React.Component<IStudentscoreMySuffixProps, IStudentscoreMySuffixState> {
  state: IStudentscoreMySuffixState = {
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
    const { studentscoreList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="studentscore-my-suffix-heading">
          <Translate contentKey="risingArjunApp.studentscore.home.title">Studentscores</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.studentscore.home.createLabel">Create new Studentscore</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {studentscoreList && studentscoreList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('answer')}>
                    <Translate contentKey="risingArjunApp.studentscore.answer">Answer</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('score')}>
                    <Translate contentKey="risingArjunApp.studentscore.score">Score</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('date')}>
                    <Translate contentKey="risingArjunApp.studentscore.date">Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.studentscore.student">Student</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.studentscore.question">Question</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {studentscoreList.map((studentscore, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${studentscore.id}`} color="link" size="sm">
                        {studentscore.id}
                      </Button>
                    </td>
                    <td>{studentscore.answer}</td>
                    <td>{studentscore.score}</td>
                    <td>
                      <TextFormat type="date" value={studentscore.date} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      {studentscore.studentStudentRegId ? (
                        <Link to={`student-my-suffix/${studentscore.studentId}`}>{studentscore.studentStudentRegId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {studentscore.questionQuestion ? (
                        <Link to={`question-my-suffix/${studentscore.questionId}`}>{studentscore.questionQuestion}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${studentscore.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${studentscore.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${studentscore.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.studentscore.home.notFound">No Studentscores found</Translate>
            </div>
          )}
        </div>
        <div className={studentscoreList && studentscoreList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ studentscore }: IRootState) => ({
  studentscoreList: studentscore.entities,
  totalItems: studentscore.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentscoreMySuffix);
