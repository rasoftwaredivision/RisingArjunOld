import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { getEntities as getEmployees } from 'app/entities/employee-my-suffix/employee-my-suffix.reducer';
import { ISubjectMySuffix } from 'app/shared/model/subject-my-suffix.model';
import { getEntities as getSubjects } from 'app/entities/subject-my-suffix/subject-my-suffix.reducer';
import { IAcademicsessionMySuffix } from 'app/shared/model/academicsession-my-suffix.model';
import { getEntities as getAcademicsessions } from 'app/entities/academicsession-my-suffix/academicsession-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './teachershare-my-suffix.reducer';
import { ITeachershareMySuffix } from 'app/shared/model/teachershare-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITeachershareMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITeachershareMySuffixUpdateState {
  isNew: boolean;
  teacherIdId: string;
  subjectId: string;
  sessionId: string;
}

export class TeachershareMySuffixUpdate extends React.Component<ITeachershareMySuffixUpdateProps, ITeachershareMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      teacherIdId: '0',
      subjectId: '0',
      sessionId: '0',
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

    this.props.getEmployees();
    this.props.getSubjects();
    this.props.getAcademicsessions();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { teachershareEntity } = this.props;
      const entity = {
        ...teachershareEntity,
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
    this.props.history.push('/entity/teachershare-my-suffix');
  };

  render() {
    const { teachershareEntity, employees, subjects, academicsessions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.teachershare.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.teachershare.home.createOrEditLabel">Create or edit a Teachershare</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : teachershareEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="teachershare-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="teachershare-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="sharePercentLabel" for="teachershare-my-suffix-sharePercent">
                    <Translate contentKey="risingArjunApp.teachershare.sharePercent">Share Percent</Translate>
                  </Label>
                  <AvField
                    id="teachershare-my-suffix-sharePercent"
                    type="string"
                    className="form-control"
                    name="sharePercent"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      max: { value: 100, errorMessage: translate('entity.validation.max', { max: 100 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="plannedClassesLabel" for="teachershare-my-suffix-plannedClasses">
                    <Translate contentKey="risingArjunApp.teachershare.plannedClasses">Planned Classes</Translate>
                  </Label>
                  <AvField
                    id="teachershare-my-suffix-plannedClasses"
                    type="string"
                    className="form-control"
                    name="plannedClasses"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="actualClassesLabel" for="teachershare-my-suffix-actualClasses">
                    <Translate contentKey="risingArjunApp.teachershare.actualClasses">Actual Classes</Translate>
                  </Label>
                  <AvField
                    id="teachershare-my-suffix-actualClasses"
                    type="string"
                    className="form-control"
                    name="actualClasses"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="shareCorrectionLabel" for="teachershare-my-suffix-shareCorrection">
                    <Translate contentKey="risingArjunApp.teachershare.shareCorrection">Share Correction</Translate>
                  </Label>
                  <AvField id="teachershare-my-suffix-shareCorrection" type="string" className="form-control" name="shareCorrection" />
                </AvGroup>
                <AvGroup>
                  <Label id="shareLabel" for="teachershare-my-suffix-share">
                    <Translate contentKey="risingArjunApp.teachershare.share">Share</Translate>
                  </Label>
                  <AvField id="teachershare-my-suffix-share" type="string" className="form-control" name="share" />
                </AvGroup>
                <AvGroup>
                  <Label id="monthLabel" for="teachershare-my-suffix-month">
                    <Translate contentKey="risingArjunApp.teachershare.month">Month</Translate>
                  </Label>
                  <AvInput
                    id="teachershare-my-suffix-month"
                    type="select"
                    className="form-control"
                    name="month"
                    value={(!isNew && teachershareEntity.month) || 'JAN'}
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
                  <Label id="remarksLabel" for="teachershare-my-suffix-remarks">
                    <Translate contentKey="risingArjunApp.teachershare.remarks">Remarks</Translate>
                  </Label>
                  <AvField id="teachershare-my-suffix-remarks" type="text" name="remarks" />
                </AvGroup>
                <AvGroup>
                  <Label for="teachershare-my-suffix-teacherId">
                    <Translate contentKey="risingArjunApp.teachershare.teacherId">Teacher Id</Translate>
                  </Label>
                  <AvInput id="teachershare-my-suffix-teacherId" type="select" className="form-control" name="teacherIdId">
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
                <AvGroup>
                  <Label for="teachershare-my-suffix-subject">
                    <Translate contentKey="risingArjunApp.teachershare.subject">Subject</Translate>
                  </Label>
                  <AvInput id="teachershare-my-suffix-subject" type="select" className="form-control" name="subjectId">
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
                  <Label for="teachershare-my-suffix-session">
                    <Translate contentKey="risingArjunApp.teachershare.session">Session</Translate>
                  </Label>
                  <AvInput id="teachershare-my-suffix-session" type="select" className="form-control" name="sessionId">
                    <option value="" key="0" />
                    {academicsessions
                      ? academicsessions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.acadSessionId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/teachershare-my-suffix" replace color="info">
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
  employees: storeState.employee.entities,
  subjects: storeState.subject.entities,
  academicsessions: storeState.academicsession.entities,
  teachershareEntity: storeState.teachershare.entity,
  loading: storeState.teachershare.loading,
  updating: storeState.teachershare.updating,
  updateSuccess: storeState.teachershare.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
  getSubjects,
  getAcademicsessions,
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
)(TeachershareMySuffixUpdate);
