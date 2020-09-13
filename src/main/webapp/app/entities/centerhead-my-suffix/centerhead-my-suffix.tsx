import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './centerhead-my-suffix.reducer';
import { ICenterheadMySuffix } from 'app/shared/model/centerhead-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICenterheadMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CenterheadMySuffix extends React.Component<ICenterheadMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { centerheadList, match } = this.props;
    return (
      <div>
        <h2 id="centerhead-my-suffix-heading">
          <Translate contentKey="risingArjunApp.centerhead.home.title">Centerheads</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.centerhead.home.createLabel">Create new Centerhead</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {centerheadList && centerheadList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.centerhead.centerhead">Centerhead</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.centerhead.center">Center</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {centerheadList.map((centerhead, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${centerhead.id}`} color="link" size="sm">
                        {centerhead.id}
                      </Button>
                    </td>
                    <td>
                      {centerhead.centerheadEmployeeId ? (
                        <Link to={`employee-my-suffix/${centerhead.centerheadId}`}>{centerhead.centerheadEmployeeId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {centerhead.centers
                        ? centerhead.centers.map((val, j) => (
                            <span key={j}>
                              <Link to={`center-my-suffix/${val.id}`}>{val.centerTitle}</Link>
                              {j === centerhead.centers.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${centerhead.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${centerhead.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${centerhead.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.centerhead.home.notFound">No Centerheads found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ centerhead }: IRootState) => ({
  centerheadList: centerhead.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenterheadMySuffix);
