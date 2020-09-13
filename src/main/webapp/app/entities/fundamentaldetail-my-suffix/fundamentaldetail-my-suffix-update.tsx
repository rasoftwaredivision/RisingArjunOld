import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuestionMySuffix } from 'app/shared/model/question-my-suffix.model';
import { getEntities as getQuestions } from 'app/entities/question-my-suffix/question-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './fundamentaldetail-my-suffix.reducer';
import { IFundamentaldetailMySuffix } from 'app/shared/model/fundamentaldetail-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFundamentaldetailMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFundamentaldetailMySuffixUpdateState {
  isNew: boolean;
  questionId: string;
}

export class FundamentaldetailMySuffixUpdate extends React.Component<
  IFundamentaldetailMySuffixUpdateProps,
  IFundamentaldetailMySuffixUpdateState
> {
  constructor(props) {
    super(props);
    this.state = {
      questionId: '0',
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

    this.props.getQuestions();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { fundamentaldetailEntity } = this.props;
      const entity = {
        ...fundamentaldetailEntity,
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
    this.props.history.push('/entity/fundamentaldetail-my-suffix');
  };

  render() {
    const { fundamentaldetailEntity, questions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingArjunApp.fundamentaldetail.home.createOrEditLabel">
              <Translate contentKey="risingArjunApp.fundamentaldetail.home.createOrEditLabel">Create or edit a Fundamentaldetail</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : fundamentaldetailEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="fundamentaldetail-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="fundamentaldetail-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="conceptLabel" for="fundamentaldetail-my-suffix-concept">
                    <Translate contentKey="risingArjunApp.fundamentaldetail.concept">Concept</Translate>
                  </Label>
                  <AvInput
                    id="fundamentaldetail-my-suffix-concept"
                    type="select"
                    className="form-control"
                    name="concept"
                    value={(!isNew && fundamentaldetailEntity.concept) || 'BASICPROPOTIONALITYTHEROEM'}
                  >
                    <option value="BASICPROPOTIONALITYTHEROEM">{translate('risingArjunApp.Fundamental.BASICPROPOTIONALITYTHEROEM')}</option>
                    <option value="SECTIONFORMULA">{translate('risingArjunApp.Fundamental.SECTIONFORMULA')}</option>
                    <option value="SASCONGURENCE">{translate('risingArjunApp.Fundamental.SASCONGURENCE')}</option>
                    <option value="MIDPOINTTHEOREM">{translate('risingArjunApp.Fundamental.MIDPOINTTHEOREM')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="detailsLabel" for="fundamentaldetail-my-suffix-details">
                    <Translate contentKey="risingArjunApp.fundamentaldetail.details">Details</Translate>
                  </Label>
                  <AvField id="fundamentaldetail-my-suffix-details" type="text" name="details" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/fundamentaldetail-my-suffix" replace color="info">
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
  questions: storeState.question.entities,
  fundamentaldetailEntity: storeState.fundamentaldetail.entity,
  loading: storeState.fundamentaldetail.loading,
  updating: storeState.fundamentaldetail.updating,
  updateSuccess: storeState.fundamentaldetail.updateSuccess
});

const mapDispatchToProps = {
  getQuestions,
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
)(FundamentaldetailMySuffixUpdate);
