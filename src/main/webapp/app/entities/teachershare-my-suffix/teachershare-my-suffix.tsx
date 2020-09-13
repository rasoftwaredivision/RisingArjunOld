import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './teachershare-my-suffix.reducer';
import { ITeachershareMySuffix } from 'app/shared/model/teachershare-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ITeachershareMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ITeachershareMySuffixState = IPaginationBaseState;

export class TeachershareMySuffix extends React.Component<ITeachershareMySuffixProps, ITeachershareMySuffixState> {
  state: ITeachershareMySuffixState = {
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
    const { teachershareList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="teachershare-my-suffix-heading">
          <Translate contentKey="risingArjunApp.teachershare.home.title">Teachershares</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.teachershare.home.createLabel">Create new Teachershare</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {teachershareList && teachershareList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('sharePercent')}>
                    <Translate contentKey="risingArjunApp.teachershare.sharePercent">Share Percent</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('plannedClasses')}>
                    <Translate contentKey="risingArjunApp.teachershare.plannedClasses">Planned Classes</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('actualClasses')}>
                    <Translate contentKey="risingArjunApp.teachershare.actualClasses">Actual Classes</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('shareCorrection')}>
                    <Translate contentKey="risingArjunApp.teachershare.shareCorrection">Share Correction</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('share')}>
                    <Translate contentKey="risingArjunApp.teachershare.share">Share</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('month')}>
                    <Translate contentKey="risingArjunApp.teachershare.month">Month</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('remarks')}>
                    <Translate contentKey="risingArjunApp.teachershare.remarks">Remarks</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.teachershare.teacherId">Teacher Id</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.teachershare.subject">Subject</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.teachershare.session">Session</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {teachershareList.map((teachershare, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${teachershare.id}`} color="link" size="sm">
                        {teachershare.id}
                      </Button>
                    </td>
                    <td>{teachershare.sharePercent}</td>
                    <td>{teachershare.plannedClasses}</td>
                    <td>{teachershare.actualClasses}</td>
                    <td>{teachershare.shareCorrection}</td>
                    <td>{teachershare.share}</td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Month.${teachershare.month}`} />
                    </td>
                    <td>{teachershare.remarks}</td>
                    <td>
                      {teachershare.teacherIdEmployeeId ? (
                        <Link to={`employee-my-suffix/${teachershare.teacherIdId}`}>{teachershare.teacherIdEmployeeId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {teachershare.subjectSubjectTitle ? (
                        <Link to={`subject-my-suffix/${teachershare.subjectId}`}>{teachershare.subjectSubjectTitle}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {teachershare.sessionAcadSessionId ? (
                        <Link to={`academicsession-my-suffix/${teachershare.sessionId}`}>{teachershare.sessionAcadSessionId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${teachershare.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${teachershare.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${teachershare.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.teachershare.home.notFound">No Teachershares found</Translate>
            </div>
          )}
        </div>
        <div className={teachershareList && teachershareList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ teachershare }: IRootState) => ({
  teachershareList: teachershare.entities,
  totalItems: teachershare.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeachershareMySuffix);
