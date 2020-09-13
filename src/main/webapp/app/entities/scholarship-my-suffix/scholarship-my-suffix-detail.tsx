import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './scholarship-my-suffix.reducer';
import { IScholarshipMySuffix } from 'app/shared/model/scholarship-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IScholarshipMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ScholarshipMySuffixDetail extends React.Component<IScholarshipMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { scholarshipEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.scholarship.detail.title">Scholarship</Translate> [<b>{scholarshipEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="minMarks">
                <Translate contentKey="risingArjunApp.scholarship.minMarks">Min Marks</Translate>
              </span>
            </dt>
            <dd>{scholarshipEntity.minMarks}</dd>
            <dt>
              <span id="percent">
                <Translate contentKey="risingArjunApp.scholarship.percent">Percent</Translate>
              </span>
            </dt>
            <dd>{scholarshipEntity.percent}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.scholarship.enterprise">Enterprise</Translate>
            </dt>
            <dd>{scholarshipEntity.enterpriseEnterprisename ? scholarshipEntity.enterpriseEnterprisename : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.scholarship.session">Session</Translate>
            </dt>
            <dd>{scholarshipEntity.sessionAcadSession ? scholarshipEntity.sessionAcadSession : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/scholarship-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/scholarship-my-suffix/${scholarshipEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ scholarship }: IRootState) => ({
  scholarshipEntity: scholarship.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScholarshipMySuffixDetail);
