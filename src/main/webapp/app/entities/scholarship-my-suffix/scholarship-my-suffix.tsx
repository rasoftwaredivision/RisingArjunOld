import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './scholarship-my-suffix.reducer';
import { IScholarshipMySuffix } from 'app/shared/model/scholarship-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IScholarshipMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ScholarshipMySuffix extends React.Component<IScholarshipMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { scholarshipList, match } = this.props;
    return (
      <div>
        <h2 id="scholarship-my-suffix-heading">
          <Translate contentKey="risingArjunApp.scholarship.home.title">Scholarships</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.scholarship.home.createLabel">Create new Scholarship</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {scholarshipList && scholarshipList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.scholarship.minMarks">Min Marks</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.scholarship.percent">Percent</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.scholarship.enterprise">Enterprise</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.scholarship.session">Session</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {scholarshipList.map((scholarship, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${scholarship.id}`} color="link" size="sm">
                        {scholarship.id}
                      </Button>
                    </td>
                    <td>{scholarship.minMarks}</td>
                    <td>{scholarship.percent}</td>
                    <td>
                      {scholarship.enterpriseEnterprisename ? (
                        <Link to={`enterprise-my-suffix/${scholarship.enterpriseId}`}>{scholarship.enterpriseEnterprisename}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {scholarship.sessionAcadSession ? (
                        <Link to={`academicsession-my-suffix/${scholarship.sessionId}`}>{scholarship.sessionAcadSession}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${scholarship.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${scholarship.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${scholarship.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.scholarship.home.notFound">No Scholarships found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ scholarship }: IRootState) => ({
  scholarshipList: scholarship.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScholarshipMySuffix);
