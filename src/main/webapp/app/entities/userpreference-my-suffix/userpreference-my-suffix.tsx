import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './userpreference-my-suffix.reducer';
import { IUserpreferenceMySuffix } from 'app/shared/model/userpreference-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserpreferenceMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class UserpreferenceMySuffix extends React.Component<IUserpreferenceMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { userpreferenceList, match } = this.props;
    return (
      <div>
        <h2 id="userpreference-my-suffix-heading">
          <Translate contentKey="risingArjunApp.userpreference.home.title">Userpreferences</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.userpreference.home.createLabel">Create new Userpreference</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {userpreferenceList && userpreferenceList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.userpreference.theme">Theme</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.userpreference.user">User</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {userpreferenceList.map((userpreference, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${userpreference.id}`} color="link" size="sm">
                        {userpreference.id}
                      </Button>
                    </td>
                    <td>{userpreference.theme}</td>
                    <td>{userpreference.userLogin ? userpreference.userLogin : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${userpreference.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${userpreference.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${userpreference.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="risingArjunApp.userpreference.home.notFound">No Userpreferences found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userpreference }: IRootState) => ({
  userpreferenceList: userpreference.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserpreferenceMySuffix);
