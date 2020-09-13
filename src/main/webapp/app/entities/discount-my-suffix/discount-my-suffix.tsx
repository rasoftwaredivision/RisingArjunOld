import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './discount-my-suffix.reducer';
import { IDiscountMySuffix } from 'app/shared/model/discount-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDiscountMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class DiscountMySuffix extends React.Component<IDiscountMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { discountList, match } = this.props;
    return (
      <div>
        <h2 id="discount-my-suffix-heading">
          <Translate contentKey="risingArjunApp.discount.home.title">Discounts</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingArjunApp.discount.home.createLabel">Create new Discount</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {discountList && discountList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.subject2">Subject 2</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.subject3">Subject 3</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.subject4">Subject 4</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.subject5">Subject 5</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.subject6">Subject 6</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.subject7">Subject 7</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.subject8">Subject 8</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.quarterly">Quarterly</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.halfYearly">Half Yearly</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.annually">Annually</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.sibling">Sibling</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.referral">Referral</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.enterprise">Enterprise</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingArjunApp.discount.session">Session</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {discountList.map((discount, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${discount.id}`} color="link" size="sm">
                        {discount.id}
                      </Button>
                    </td>
                    <td>{discount.subject2}</td>
                    <td>{discount.subject3}</td>
                    <td>{discount.subject4}</td>
                    <td>{discount.subject5}</td>
                    <td>{discount.subject6}</td>
                    <td>{discount.subject7}</td>
                    <td>{discount.subject8}</td>
                    <td>{discount.quarterly}</td>
                    <td>{discount.halfYearly}</td>
                    <td>{discount.annually}</td>
                    <td>{discount.sibling}</td>
                    <td>{discount.referral}</td>
                    <td>
                      {discount.enterpriseEnterprisename ? (
                        <Link to={`enterprise-my-suffix/${discount.enterpriseId}`}>{discount.enterpriseEnterprisename}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {discount.sessionAcadSession ? (
                        <Link to={`academicsession-my-suffix/${discount.sessionId}`}>{discount.sessionAcadSession}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${discount.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${discount.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${discount.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingArjunApp.discount.home.notFound">No Discounts found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ discount }: IRootState) => ({
  discountList: discount.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscountMySuffix);
