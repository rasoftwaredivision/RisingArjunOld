import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEnterpriseMySuffix } from 'app/shared/model/enterprise-my-suffix.model';
import { getEntities as getEnterprises } from 'app/entities/enterprise-my-suffix/enterprise-my-suffix.reducer';
import { IAcademicsessionMySuffix } from 'app/shared/model/academicsession-my-suffix.model';
import { getEntities as getAcademicsessions } from 'app/entities/academicsession-my-suffix/academicsession-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './scholarship-my-suffix.reducer';
import { IScholarshipMySuffix } from 'app/shared/model/scholarship-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IScholarshipMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IScholarshipMySuffixUpdateState {
  isNew: boolean;
  enterpriseId: string;
  sessionId: string;
}

export class ScholarshipMySuffixUpdate extends React.Component<IScholarshipMySuffixUpdateProps, IScholarshipMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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

    this.props.getEnterprises();
    this.props.getAcademicsessions();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { scholarshipEntity } = this.props;
      const entity = {
        ...scholarshipEntity,
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
    this.props.history.push('/entity/scholarship-my-suffix');
  };

  render() {
    const { scholarshipEntity, enterprises, academicsessions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.scholarship.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.scholarship.home.createOrEditLabel">Create or edit a Scholarship</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : scholarshipEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="scholarship-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="scholarship-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="minMarksLabel" for="scholarship-my-suffix-minMarks">
                    <Translate contentKey="risingArjunApp.scholarship.minMarks">Min Marks</Translate>
                  </Label>
                  <AvField id="scholarship-my-suffix-minMarks" type="string" className="form-control" name="minMarks" />
                </AvGroup>
                <AvGroup>
                  <Label id="percentLabel" for="scholarship-my-suffix-percent">
                    <Translate contentKey="risingArjunApp.scholarship.percent">Percent</Translate>
                  </Label>
                  <AvField id="scholarship-my-suffix-percent" type="string" className="form-control" name="percent" />
                </AvGroup>
                <AvGroup>
                  <Label for="scholarship-my-suffix-enterprise">
                    <Translate contentKey="risingArjunApp.scholarship.enterprise">Enterprise</Translate>
                  </Label>
                  <AvInput id="scholarship-my-suffix-enterprise" type="select" className="form-control" name="enterpriseId">
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
                  <Label for="scholarship-my-suffix-session">
                    <Translate contentKey="risingArjunApp.scholarship.session">Session</Translate>
                  </Label>
                  <AvInput id="scholarship-my-suffix-session" type="select" className="form-control" name="sessionId">
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
                <Button tag={Link} id="cancel-save" to="/entity/scholarship-my-suffix" replace color="info">
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
  enterprises: storeState.enterprise.entities,
  academicsessions: storeState.academicsession.entities,
  scholarshipEntity: storeState.scholarship.entity,
  loading: storeState.scholarship.loading,
  updating: storeState.scholarship.updating,
  updateSuccess: storeState.scholarship.updateSuccess
});

const mapDispatchToProps = {
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
)(ScholarshipMySuffixUpdate);
