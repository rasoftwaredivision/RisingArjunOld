import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-my-suffix.reducer';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmployeeMySuffixDetail extends React.Component<IEmployeeMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { employeeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.employee.detail.title">Employee</Translate> [<b>{employeeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="employeeId">
                <Translate contentKey="risingArjunApp.employee.employeeId">Employee Id</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.employeeId}</dd>
            <dt>
              <span id="jobNature">
                <Translate contentKey="risingArjunApp.employee.jobNature">Job Nature</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.jobNature}</dd>
            <dt>
              <span id="bgc">
                <Translate contentKey="risingArjunApp.employee.bgc">Bgc</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.bgc ? 'true' : 'false'}</dd>
            <dt>
              <span id="resume">
                <Translate contentKey="risingArjunApp.employee.resume">Resume</Translate>
              </span>
            </dt>
            <dd>
              {employeeEntity.resume ? (
                <div>
                  <a onClick={openFile(employeeEntity.resumeContentType, employeeEntity.resume)}>
                    <img src={`data:${employeeEntity.resumeContentType};base64,${employeeEntity.resume}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {employeeEntity.resumeContentType}, {byteSize(employeeEntity.resume)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="pan">
                <Translate contentKey="risingArjunApp.employee.pan">Pan</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.pan}</dd>
            <dt>
              <span id="accountNo">
                <Translate contentKey="risingArjunApp.employee.accountNo">Account No</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.accountNo}</dd>
            <dt>
              <span id="bank">
                <Translate contentKey="risingArjunApp.employee.bank">Bank</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.bank}</dd>
            <dt>
              <span id="ifsc">
                <Translate contentKey="risingArjunApp.employee.ifsc">Ifsc</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.ifsc}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.employee.user">User</Translate>
            </dt>
            <dd>{employeeEntity.userLogin ? employeeEntity.userLogin : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/employee-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/employee-my-suffix/${employeeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeEntity: employee.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeMySuffixDetail);
