import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './enterprise-my-suffix.reducer';
import { IEnterpriseMySuffix } from 'app/shared/model/enterprise-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnterpriseMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EnterpriseMySuffixDetail extends React.Component<IEnterpriseMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { enterpriseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.enterprise.detail.title">Enterprise</Translate> [<b>{enterpriseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="abbrevation">
                <Translate contentKey="risingArjunApp.enterprise.abbrevation">Abbrevation</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.abbrevation}</dd>
            <dt>
              <span id="enterprisename">
                <Translate contentKey="risingArjunApp.enterprise.enterprisename">Enterprisename</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.enterprisename}</dd>
            <dt>
              <span id="natureofbusiness">
                <Translate contentKey="risingArjunApp.enterprise.natureofbusiness">Natureofbusiness</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.natureofbusiness}</dd>
            <dt>
              <span id="logo">
                <Translate contentKey="risingArjunApp.enterprise.logo">Logo</Translate>
              </span>
            </dt>
            <dd>
              {enterpriseEntity.logo ? (
                <div>
                  <a onClick={openFile(enterpriseEntity.logoContentType, enterpriseEntity.logo)}>
                    <img src={`data:${enterpriseEntity.logoContentType};base64,${enterpriseEntity.logo}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {enterpriseEntity.logoContentType}, {byteSize(enterpriseEntity.logo)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="punchline">
                <Translate contentKey="risingArjunApp.enterprise.punchline">Punchline</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.punchline}</dd>
            <dt>
              <span id="mission">
                <Translate contentKey="risingArjunApp.enterprise.mission">Mission</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.mission}</dd>
            <dt>
              <span id="vision">
                <Translate contentKey="risingArjunApp.enterprise.vision">Vision</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.vision}</dd>
            <dt>
              <span id="principles">
                <Translate contentKey="risingArjunApp.enterprise.principles">Principles</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.principles}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="risingArjunApp.enterprise.email">Email</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.email}</dd>
            <dt>
              <span id="mobile">
                <Translate contentKey="risingArjunApp.enterprise.mobile">Mobile</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.mobile}</dd>
            <dt>
              <span id="landline">
                <Translate contentKey="risingArjunApp.enterprise.landline">Landline</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.landline}</dd>
            <dt>
              <span id="fax">
                <Translate contentKey="risingArjunApp.enterprise.fax">Fax</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.fax}</dd>
            <dt>
              <span id="plotNo">
                <Translate contentKey="risingArjunApp.enterprise.plotNo">Plot No</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.plotNo}</dd>
            <dt>
              <span id="street">
                <Translate contentKey="risingArjunApp.enterprise.street">Street</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.street}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="risingArjunApp.enterprise.city">City</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.city}</dd>
            <dt>
              <span id="state">
                <Translate contentKey="risingArjunApp.enterprise.state">State</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.state}</dd>
            <dt>
              <span id="country">
                <Translate contentKey="risingArjunApp.enterprise.country">Country</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.country}</dd>
            <dt>
              <span id="pincode">
                <Translate contentKey="risingArjunApp.enterprise.pincode">Pincode</Translate>
              </span>
            </dt>
            <dd>{enterpriseEntity.pincode}</dd>
          </dl>
          <Button tag={Link} to="/entity/enterprise-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/enterprise-my-suffix/${enterpriseEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ enterprise }: IRootState) => ({
  enterpriseEntity: enterprise.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterpriseMySuffixDetail);
