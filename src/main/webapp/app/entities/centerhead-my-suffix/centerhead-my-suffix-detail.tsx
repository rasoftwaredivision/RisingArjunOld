import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './centerhead-my-suffix.reducer';
import { ICenterheadMySuffix } from 'app/shared/model/centerhead-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICenterheadMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CenterheadMySuffixDetail extends React.Component<ICenterheadMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { centerheadEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.centerhead.detail.title">Centerhead</Translate> [<b>{centerheadEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <Translate contentKey="risingArjunApp.centerhead.centerhead">Centerhead</Translate>
            </dt>
            <dd>{centerheadEntity.centerheadEmployeeId ? centerheadEntity.centerheadEmployeeId : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.centerhead.center">Center</Translate>
            </dt>
            <dd>
              {centerheadEntity.centers
                ? centerheadEntity.centers.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.centerTitle}</a>
                      {i === centerheadEntity.centers.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/centerhead-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/centerhead-my-suffix/${centerheadEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ centerhead }: IRootState) => ({
  centerheadEntity: centerhead.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenterheadMySuffixDetail);
