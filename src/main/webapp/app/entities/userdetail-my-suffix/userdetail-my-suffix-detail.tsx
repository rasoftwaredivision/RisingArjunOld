import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './userdetail-my-suffix.reducer';
import { IUserdetailMySuffix } from 'app/shared/model/userdetail-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserdetailMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UserdetailMySuffixDetail extends React.Component<IUserdetailMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userdetailEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.userdetail.detail.title">Userdetail</Translate> [<b>{userdetailEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="mobileNo">
                <Translate contentKey="risingArjunApp.userdetail.mobileNo">Mobile No</Translate>
              </span>
            </dt>
            <dd>{userdetailEntity.mobileNo}</dd>
            <dt>
              <span id="dob">
                <Translate contentKey="risingArjunApp.userdetail.dob">Dob</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={userdetailEntity.dob} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="houseNo">
                <Translate contentKey="risingArjunApp.userdetail.houseNo">House No</Translate>
              </span>
            </dt>
            <dd>{userdetailEntity.houseNo}</dd>
            <dt>
              <span id="street">
                <Translate contentKey="risingArjunApp.userdetail.street">Street</Translate>
              </span>
            </dt>
            <dd>{userdetailEntity.street}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="risingArjunApp.userdetail.city">City</Translate>
              </span>
            </dt>
            <dd>{userdetailEntity.city}</dd>
            <dt>
              <span id="state">
                <Translate contentKey="risingArjunApp.userdetail.state">State</Translate>
              </span>
            </dt>
            <dd>{userdetailEntity.state}</dd>
            <dt>
              <span id="country">
                <Translate contentKey="risingArjunApp.userdetail.country">Country</Translate>
              </span>
            </dt>
            <dd>{userdetailEntity.country}</dd>
            <dt>
              <span id="pincode">
                <Translate contentKey="risingArjunApp.userdetail.pincode">Pincode</Translate>
              </span>
            </dt>
            <dd>{userdetailEntity.pincode}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.userdetail.user">User</Translate>
            </dt>
            <dd>{userdetailEntity.userLogin ? userdetailEntity.userLogin : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.userdetail.enterprise">Enterprise</Translate>
            </dt>
            <dd>{userdetailEntity.enterpriseEnterprisename ? userdetailEntity.enterpriseEnterprisename : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/userdetail-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/userdetail-my-suffix/${userdetailEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ userdetail }: IRootState) => ({
  userdetailEntity: userdetail.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserdetailMySuffixDetail);
