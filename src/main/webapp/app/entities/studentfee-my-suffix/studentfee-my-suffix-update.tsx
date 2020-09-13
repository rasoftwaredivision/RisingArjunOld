import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStudentMySuffix } from 'app/shared/model/student-my-suffix.model';
import { getEntities as getStudents } from 'app/entities/student-my-suffix/student-my-suffix.reducer';
import { ISubjectMySuffix } from 'app/shared/model/subject-my-suffix.model';
import { getEntities as getSubjects } from 'app/entities/subject-my-suffix/subject-my-suffix.reducer';
import { IAcademicsessionMySuffix } from 'app/shared/model/academicsession-my-suffix.model';
import { getEntities as getAcademicsessions } from 'app/entities/academicsession-my-suffix/academicsession-my-suffix.reducer';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { getEntities as getEmployees } from 'app/entities/employee-my-suffix/employee-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './studentfee-my-suffix.reducer';
import { IStudentfeeMySuffix } from 'app/shared/model/studentfee-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStudentfeeMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IStudentfeeMySuffixUpdateState {
  isNew: boolean;
  registrationnoId: string;
  subjectId: string;
  sessionId: string;
  teacherId: string;
}

export class StudentfeeMySuffixUpdate extends React.Component<IStudentfeeMySuffixUpdateProps, IStudentfeeMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      registrationnoId: '0',
      subjectId: '0',
      sessionId: '0',
      teacherId: '0',
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

    this.props.getStudents();
    this.props.getSubjects();
    this.props.getAcademicsessions();
    this.props.getEmployees();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { studentfeeEntity } = this.props;
      const entity = {
        ...studentfeeEntity,
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
    this.props.history.push('/entity/studentfee-my-suffix');
  };

  render() {
    const { studentfeeEntity, students, subjects, academicsessions, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.studentfee.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.studentfee.home.createOrEditLabel">Create or edit a Studentfee</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : studentfeeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="studentfee-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="studentfee-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="feeLabel" for="studentfee-my-suffix-fee">
                    <Translate contentKey="risingArjunApp.studentfee.fee">Fee</Translate>
                  </Label>
                  <AvField id="studentfee-my-suffix-fee" type="string" className="form-control" name="fee" />
                </AvGroup>
                <AvGroup>
                  <Label id="feeCorrectionLabel" for="studentfee-my-suffix-feeCorrection">
                    <Translate contentKey="risingArjunApp.studentfee.feeCorrection">Fee Correction</Translate>
                  </Label>
                  <AvField id="studentfee-my-suffix-feeCorrection" type="string" className="form-control" name="feeCorrection" />
                </AvGroup>
                <AvGroup>
                  <Label id="monthLabel" for="studentfee-my-suffix-month">
                    <Translate contentKey="risingArjunApp.studentfee.month">Month</Translate>
                  </Label>
                  <AvInput
                    id="studentfee-my-suffix-month"
                    type="select"
                    className="form-control"
                    name="month"
                    value={(!isNew && studentfeeEntity.month) || 'JAN'}
                  >
                    <option value="JAN">{translate('risingArjunApp.Month.JAN')}</option>
                    <option value="FEB">{translate('risingArjunApp.Month.FEB')}</option>
                    <option value="MAR">{translate('risingArjunApp.Month.MAR')}</option>
                    <option value="APR">{translate('risingArjunApp.Month.APR')}</option>
                    <option value="MAY">{translate('risingArjunApp.Month.MAY')}</option>
                    <option value="JUN">{translate('risingArjunApp.Month.JUN')}</option>
                    <option value="JUL">{translate('risingArjunApp.Month.JUL')}</option>
                    <option value="AUG">{translate('risingArjunApp.Month.AUG')}</option>
                    <option value="SEP">{translate('risingArjunApp.Month.SEP')}</option>
                    <option value="OCT">{translate('risingArjunApp.Month.OCT')}</option>
                    <option value="NOV">{translate('risingArjunApp.Month.NOV')}</option>
                    <option value="DEC">{translate('risingArjunApp.Month.DEC')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="feeStatusLabel" check>
                    <AvInput id="studentfee-my-suffix-feeStatus" type="checkbox" className="form-control" name="feeStatus" />
                    <Translate contentKey="risingArjunApp.studentfee.feeStatus">Fee Status</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="remarksLabel" for="studentfee-my-suffix-remarks">
                    <Translate contentKey="risingArjunApp.studentfee.remarks">Remarks</Translate>
                  </Label>
                  <AvField id="studentfee-my-suffix-remarks" type="text" name="remarks" />
                </AvGroup>
                <AvGroup>
                  <Label for="studentfee-my-suffix-registrationno">
                    <Translate contentKey="risingArjunApp.studentfee.registrationno">Registrationno</Translate>
                  </Label>
                  <AvInput id="studentfee-my-suffix-registrationno" type="select" className="form-control" name="registrationnoId">
                    <option value="" key="0" />
                    {students
                      ? students.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.studentRegId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="studentfee-my-suffix-subject">
                    <Translate contentKey="risingArjunApp.studentfee.subject">Subject</Translate>
                  </Label>
                  <AvInput id="studentfee-my-suffix-subject" type="select" className="form-control" name="subjectId">
                    <option value="" key="0" />
                    {subjects
                      ? subjects.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.subjectTitle}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="studentfee-my-suffix-session">
                    <Translate contentKey="risingArjunApp.studentfee.session">Session</Translate>
                  </Label>
                  <AvInput id="studentfee-my-suffix-session" type="select" className="form-control" name="sessionId">
                    <option value="" key="0" />
                    {academicsessions
                      ? academicsessions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.acadSession}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="studentfee-my-suffix-teacher">
                    <Translate contentKey="risingArjunApp.studentfee.teacher">Teacher</Translate>
                  </Label>
                  <AvInput id="studentfee-my-suffix-teacher" type="select" className="form-control" name="teacherId">
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.employeeId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/studentfee-my-suffix" replace color="info">
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
  students: storeState.student.entities,
  subjects: storeState.subject.entities,
  academicsessions: storeState.academicsession.entities,
  employees: storeState.employee.entities,
  studentfeeEntity: storeState.studentfee.entity,
  loading: storeState.studentfee.loading,
  updating: storeState.studentfee.updating,
  updateSuccess: storeState.studentfee.updateSuccess
});

const mapDispatchToProps = {
  getStudents,
  getSubjects,
  getAcademicsessions,
  getEmployees,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentfeeMySuffixUpdate);
