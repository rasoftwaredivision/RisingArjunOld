import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './subjectsbasefee-my-suffix.reducer';
import { ISubjectsbasefeeMySuffix } from 'app/shared/model/subjectsbasefee-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubjectsbasefeeMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class SubjectsbasefeeMySuffix extends React.Component<ISubjectsbasefeeMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { subjectsbasefeeList, match } = this.props;
    return (
      <div>
        <h2 id="subjectsbasefee-my-suffix-heading">
          <Translate contentKey="risingArjunApp.subjectsbasefee.home.title">Subjectsbasefees</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.subjectsbasefee.home.createLabel">Create new Subjectsbasefee</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {subjectsbasefeeList && subjectsbasefeeList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.subjectsbasefee.baseFee">Base Fee</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.subjectsbasefee.course">Course</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.subjectsbasefee.enterprise">Enterprise</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.subjectsbasefee.session">Session</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {subjectsbasefeeList.map((subjectsbasefee, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${subjectsbasefee.id}`} color="link" size="sm">
                        {subjectsbasefee.id}
                      </Button>
                    </td>
                    <td>{subjectsbasefee.baseFee}</td>
                    <td>
                      {subjectsbasefee.courseCourse ? (
                        <Link to={`course-my-suffix/${subjectsbasefee.courseId}`}>{subjectsbasefee.courseCourse}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {subjectsbasefee.enterpriseEnterprisename ? (
                        <Link to={`enterprise-my-suffix/${subjectsbasefee.enterpriseId}`}>{subjectsbasefee.enterpriseEnterprisename}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {subjectsbasefee.sessionAcadSession ? (
                        <Link to={`academicsession-my-suffix/${subjectsbasefee.sessionId}`}>{subjectsbasefee.sessionAcadSession}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${subjectsbasefee.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${subjectsbasefee.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${subjectsbasefee.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.subjectsbasefee.home.notFound">No Subjectsbasefees found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ subjectsbasefee }: IRootState) => ({
  subjectsbasefeeList: subjectsbasefee.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectsbasefeeMySuffix);
