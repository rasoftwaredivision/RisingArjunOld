import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './academicsession-my-suffix.reducer';
import { IAcademicsessionMySuffix } from 'app/shared/model/academicsession-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAcademicsessionMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class AcademicsessionMySuffix extends React.Component<IAcademicsessionMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { academicsessionList, match } = this.props;
    return (
      <div>
        <h2 id="academicsession-my-suffix-heading">
          <Translate contentKey="risingArjunApp.academicsession.home.title">Academicsessions</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.academicsession.home.createLabel">Create new Academicsession</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {academicsessionList && academicsessionList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.academicsession.acadSessionId">Acad Session Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.academicsession.acadSession">Acad Session</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {academicsessionList.map((academicsession, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${academicsession.id}`} color="link" size="sm">
                        {academicsession.id}
                      </Button>
                    </td>
                    <td>{academicsession.acadSessionId}</td>
                    <td>{academicsession.acadSession}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${academicsession.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${academicsession.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${academicsession.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.academicsession.home.notFound">No Academicsessions found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ academicsession }: IRootState) => ({
  academicsessionList: academicsession.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcademicsessionMySuffix);
