import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './userpreference-my-suffix.reducer';
import { IUserpreferenceMySuffix } from 'app/shared/model/userpreference-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserpreferenceMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UserpreferenceMySuffixDetail extends React.Component<IUserpreferenceMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userpreferenceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.userpreference.detail.title">Userpreference</Translate> [<b>{userpreferenceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="theme">
                <Translate contentKey="risingArjunApp.userpreference.theme">Theme</Translate>
              </span>
            </dt>
            <dd>{userpreferenceEntity.theme}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.userpreference.user">User</Translate>
            </dt>
            <dd>{userpreferenceEntity.userLogin ? userpreferenceEntity.userLogin : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/userpreference-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/userpreference-my-suffix/${userpreferenceEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ userpreference }: IRootState) => ({
  userpreferenceEntity: userpreference.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserpreferenceMySuffixDetail);
