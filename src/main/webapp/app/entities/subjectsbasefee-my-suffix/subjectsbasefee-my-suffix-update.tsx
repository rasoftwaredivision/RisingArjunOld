import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';
import { getEntities as getCourses } from 'app/entities/course-my-suffix/course-my-suffix.reducer';
import { IEnterpriseMySuffix } from 'app/shared/model/enterprise-my-suffix.model';
import { getEntities as getEnterprises } from 'app/entities/enterprise-my-suffix/enterprise-my-suffix.reducer';
import { IAcademicsessionMySuffix } from 'app/shared/model/academicsession-my-suffix.model';
import { getEntities as getAcademicsessions } from 'app/entities/academicsession-my-suffix/academicsession-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './subjectsbasefee-my-suffix.reducer';
import { ISubjectsbasefeeMySuffix } from 'app/shared/model/subjectsbasefee-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISubjectsbasefeeMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISubjectsbasefeeMySuffixUpdateState {
  isNew: boolean;
  courseId: string;
  enterpriseId: string;
  sessionId: string;
}

export class SubjectsbasefeeMySuffixUpdate extends React.Component<
  ISubjectsbasefeeMySuffixUpdateProps,
  ISubjectsbasefeeMySuffixUpdateState
> {
  constructor(props) {
    super(props);
    this.state = {
      courseId: '0',
      enterpriseId: '0',
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

    this.props.getCourses();
    this.props.getEnterprises();
    this.props.getAcademicsessions();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { subjectsbasefeeEntity } = this.props;
      const entity = {
        ...subjectsbasefeeEntity,
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
    this.props.history.push('/entity/subjectsbasefee-my-suffix');
  };

  render() {
    const { subjectsbasefeeEntity, courses, enterprises, academicsessions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.subjectsbasefee.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.subjectsbasefee.home.createOrEditLabel">Create or edit a Subjectsbasefee</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : subjectsbasefeeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="subjectsbasefee-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="subjectsbasefee-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="baseFeeLabel" for="subjectsbasefee-my-suffix-baseFee">
                    <Translate contentKey="risingArjunApp.subjectsbasefee.baseFee">Base Fee</Translate>
                  </Label>
                  <AvField id="subjectsbasefee-my-suffix-baseFee" type="string" className="form-control" name="baseFee" />
                </AvGroup>
                <AvGroup>
                  <Label for="subjectsbasefee-my-suffix-course">
                    <Translate contentKey="risingArjunApp.subjectsbasefee.course">Course</Translate>
                  </Label>
                  <AvInput id="subjectsbasefee-my-suffix-course" type="select" className="form-control" name="courseId">
                    <option value="" key="0" />
                    {courses
                      ? courses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.course}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="subjectsbasefee-my-suffix-enterprise">
                    <Translate contentKey="risingArjunApp.subjectsbasefee.enterprise">Enterprise</Translate>
                  </Label>
                  <AvInput id="subjectsbasefee-my-suffix-enterprise" type="select" className="form-control" name="enterpriseId">
                    <option value="" key="0" />
                    {enterprises
                      ? enterprises.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.enterprisename}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="subjectsbasefee-my-suffix-session">
                    <Translate contentKey="risingArjunApp.subjectsbasefee.session">Session</Translate>
                  </Label>
                  <AvInput id="subjectsbasefee-my-suffix-session" type="select" className="form-control" name="sessionId">
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
                <Button tag={Link} id="cancel-save" to="/entity/subjectsbasefee-my-suffix" replace color="info">
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
  courses: storeState.course.entities,
  enterprises: storeState.enterprise.entities,
  academicsessions: storeState.academicsession.entities,
  subjectsbasefeeEntity: storeState.subjectsbasefee.entity,
  loading: storeState.subjectsbasefee.loading,
  updating: storeState.subjectsbasefee.updating,
  updateSuccess: storeState.subjectsbasefee.updateSuccess
});

const mapDispatchToProps = {
  getCourses,
  getEnterprises,
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
)(SubjectsbasefeeMySuffixUpdate);
