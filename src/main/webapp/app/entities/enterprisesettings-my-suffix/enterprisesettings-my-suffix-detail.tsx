import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './enterprisesettings-my-suffix.reducer';
import { IEnterprisesettingsMySuffix } from 'app/shared/model/enterprisesettings-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnterprisesettingsMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EnterprisesettingsMySuffixDetail extends React.Component<IEnterprisesettingsMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { enterprisesettingsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.enterprisesettings.detail.title">Enterprisesettings</Translate> [
            <b>{enterprisesettingsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="theme">
                <Translate contentKey="risingArjunApp.enterprisesettings.theme">Theme</Translate>
              </span>
            </dt>
            <dd>{enterprisesettingsEntity.theme}</dd>
            <dt>
              <span id="foreground">
                <Translate contentKey="risingArjunApp.enterprisesettings.foreground">Foreground</Translate>
              </span>
            </dt>
            <dd>{enterprisesettingsEntity.foreground}</dd>
            <dt>
              <span id="background">
                <Translate contentKey="risingArjunApp.enterprisesettings.background">Background</Translate>
              </span>
            </dt>
            <dd>{enterprisesettingsEntity.background}</dd>
            <dt>
              <span id="disclaimer">
                <Translate contentKey="risingArjunApp.enterprisesettings.disclaimer">Disclaimer</Translate>
              </span>
            </dt>
            <dd>{enterprisesettingsEntity.disclaimer}</dd>
            <dt>
              <span id="policy">
                <Translate contentKey="risingArjunApp.enterprisesettings.policy">Policy</Translate>
              </span>
            </dt>
            <dd>{enterprisesettingsEntity.policy}</dd>
            <dt>
              <span id="copyrights">
                <Translate contentKey="risingArjunApp.enterprisesettings.copyrights">Copyrights</Translate>
              </span>
            </dt>
            <dd>{enterprisesettingsEntity.copyrights}</dd>
            <dt>
              <span id="termsOfUsage">
                <Translate contentKey="risingArjunApp.enterprisesettings.termsOfUsage">Terms Of Usage</Translate>
              </span>
            </dt>
            <dd>{enterprisesettingsEntity.termsOfUsage}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.enterprisesettings.admin">Admin</Translate>
            </dt>
            <dd>{enterprisesettingsEntity.adminLogin ? enterprisesettingsEntity.adminLogin : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.enterprisesettings.enterprise">Enterprise</Translate>
            </dt>
            <dd>{enterprisesettingsEntity.enterpriseEnterprisename ? enterprisesettingsEntity.enterpriseEnterprisename : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/enterprisesettings-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/enterprisesettings-my-suffix/${enterprisesettingsEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ enterprisesettings }: IRootState) => ({
  enterprisesettingsEntity: enterprisesettings.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterprisesettingsMySuffixDetail);
