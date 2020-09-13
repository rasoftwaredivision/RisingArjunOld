import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './employee-my-suffix.reducer';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEmployeeMySuffixUpdateState {
  isNew: boolean;
  userId: string;
}

export class EmployeeMySuffixUpdate extends React.Component<IEmployeeMySuffixUpdateProps, IEmployeeMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { employeeEntity } = this.props;
      const entity = {
        ...employeeEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/employee-my-suffix');
  };

  render() {
    const { employeeEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    const { resume, resumeContentType } = employeeEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.employee.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.employee.home.createOrEditLabel">Create or edit a Employee</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : employeeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="employee-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="employee-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="employeeIdLabel" for="employee-my-suffix-employeeId">
                    <Translate contentKey="risingArjunApp.employee.employeeId">Employee Id</Translate>
                  </Label>
                  <AvField
                    id="employee-my-suffix-employeeId"
                    type="text"
                    name="employeeId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="jobNatureLabel" for="employee-my-suffix-jobNature">
                    <Translate contentKey="risingArjunApp.employee.jobNature">Job Nature</Translate>
                  </Label>
                  <AvInput
                    id="employee-my-suffix-jobNature"
                    type="select"
                    className="form-control"
                    name="jobNature"
                    value={(!isNew && employeeEntity.jobNature) || 'PARTTIME'}
                  >
                    <option value="PARTTIME">{translate('risingArjunApp.Jobnature.PARTTIME')}</option>
                    <option value="FULLTIME">{translate('risingArjunApp.Jobnature.FULLTIME')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="bgcLabel" check>
                    <AvInput id="employee-my-suffix-bgc" type="checkbox" className="form-control" name="bgc" />
                    <Translate contentKey="risingArjunApp.employee.bgc">Bgc</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="resumeLabel" for="resume">
                      <Translate contentKey="risingArjunApp.employee.resume">Resume</Translate>
                    </Label>
                    <br />
                    {resume ? (
                      <div>
                        <a onClick={openFile(resumeContentType, resume)}>
                          <img src={`data:${resumeContentType};base64,${resume}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {resumeContentType}, {byteSize(resume)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('resume')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_resume" type="file" onChange={this.onBlobChange(true, 'resume')} accept="image/*" />
                    <AvInput type="hidden" name="resume" value={resume} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="panLabel" for="employee-my-suffix-pan">
                    <Translate contentKey="risingArjunApp.employee.pan">Pan</Translate>
                  </Label>
                  <AvField id="employee-my-suffix-pan" type="text" name="pan" />
                </AvGroup>
                <AvGroup>
                  <Label id="accountNoLabel" for="employee-my-suffix-accountNo">
                    <Translate contentKey="risingArjunApp.employee.accountNo">Account No</Translate>
                  </Label>
                  <AvField id="employee-my-suffix-accountNo" type="text" name="accountNo" />
                </AvGroup>
                <AvGroup>
                  <Label id="bankLabel" for="employee-my-suffix-bank">
                    <Translate contentKey="risingArjunApp.employee.bank">Bank</Translate>
                  </Label>
                  <AvField id="employee-my-suffix-bank" type="text" name="bank" />
                </AvGroup>
                <AvGroup>
                  <Label id="ifscLabel" for="employee-my-suffix-ifsc">
                    <Translate contentKey="risingArjunApp.employee.ifsc">Ifsc</Translate>
                  </Label>
                  <AvField id="employee-my-suffix-ifsc" type="text" name="ifsc" />
                </AvGroup>
                <AvGroup>
                  <Label for="employee-my-suffix-user">
                    <Translate contentKey="risingArjunApp.employee.user">User</Translate>
                  </Label>
                  <AvInput id="employee-my-suffix-user" type="select" className="form-control" name="userId">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/employee-my-suffix" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  employeeEntity: storeState.employee.entity,
  loading: storeState.employee.loading,
  updating: storeState.employee.updating,
  updateSuccess: storeState.employee.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeMySuffixUpdate);
