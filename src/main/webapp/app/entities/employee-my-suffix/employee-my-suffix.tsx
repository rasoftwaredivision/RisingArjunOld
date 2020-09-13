import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-my-suffix.reducer';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EmployeeMySuffix extends React.Component<IEmployeeMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { employeeList, match } = this.props;
    return (
      <div>
        <h2 id="employee-my-suffix-heading">
          <Translate contentKey="risingArjunApp.employee.home.title">Employees</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.employee.home.createLabel">Create new Employee</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {employeeList && employeeList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.employee.employeeId">Employee Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.employee.jobNature">Job Nature</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.employee.bgc">Bgc</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.employee.resume">Resume</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.employee.pan">Pan</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.employee.accountNo">Account No</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.employee.bank">Bank</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.employee.ifsc">Ifsc</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.employee.user">User</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {employeeList.map((employee, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${employee.id}`} color="link" size="sm">
                        {employee.id}
                      </Button>
                    </td>
                    <td>{employee.employeeId}</td>
                    <td>
                      <Translate contentKey={`risingArjunApp.Jobnature.${employee.jobNature}`} />
                    </td>
                    <td>{employee.bgc ? 'true' : 'false'}</td>
                    <td>
                      {employee.resume ? (
                        <div>
                          <a onClick={openFile(employee.resumeContentType, employee.resume)}>
                            <img src={`data:${employee.resumeContentType};base64,${employee.resume}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                            {employee.resumeContentType}, {byteSize(employee.resume)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{employee.pan}</td>
                    <td>{employee.accountNo}</td>
                    <td>{employee.bank}</td>
                    <td>{employee.ifsc}</td>
                    <td>{employee.userLogin ? employee.userLogin : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${employee.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${employee.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${employee.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.employee.home.notFound">No Employees found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeList: employee.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeMySuffix);
