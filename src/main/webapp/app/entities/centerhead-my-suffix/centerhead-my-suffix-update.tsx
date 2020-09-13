import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { getEntities as getEmployees } from 'app/entities/employee-my-suffix/employee-my-suffix.reducer';
import { ICenterMySuffix } from 'app/shared/model/center-my-suffix.model';
import { getEntities as getCenters } from 'app/entities/center-my-suffix/center-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './centerhead-my-suffix.reducer';
import { ICenterheadMySuffix } from 'app/shared/model/centerhead-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICenterheadMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICenterheadMySuffixUpdateState {
  isNew: boolean;
  idscenter: any[];
  centerheadId: string;
}

export class CenterheadMySuffixUpdate extends React.Component<ICenterheadMySuffixUpdateProps, ICenterheadMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idscenter: [],
      centerheadId: '0',
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
    this.props.getCenters();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { centerheadEntity } = this.props;
      const entity = {
        ...centerheadEntity,
        ...values,
        centers: mapIdList(values.centers)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/centerhead-my-suffix');
  };

  render() {
    const { centerheadEntity, employees, centers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.centerhead.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.centerhead.home.createOrEditLabel">Create or edit a Centerhead</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : centerheadEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="centerhead-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="centerhead-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label for="centerhead-my-suffix-centerhead">
                    <Translate contentKey="risingArjunApp.centerhead.centerhead">Centerhead</Translate>
                  </Label>
                  <AvInput id="centerhead-my-suffix-centerhead" type="select" className="form-control" name="centerheadId">
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
                  <Label for="centerhead-my-suffix-center">
                    <Translate contentKey="risingArjunApp.centerhead.center">Center</Translate>
                  </Label>
                  <AvInput
                    id="centerhead-my-suffix-center"
                    type="select"
                    multiple
                    className="form-control"
                    name="centers"
                    value={centerheadEntity.centers && centerheadEntity.centers.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {centers
                      ? centers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.centerTitle}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/centerhead-my-suffix" replace color="info">
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
  centers: storeState.center.entities,
  centerheadEntity: storeState.centerhead.entity,
  loading: storeState.centerhead.loading,
  updating: storeState.centerhead.updating,
  updateSuccess: storeState.centerhead.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
  getCenters,
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
)(CenterheadMySuffixUpdate);
