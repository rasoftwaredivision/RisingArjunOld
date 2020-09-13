import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DiscountMySuffix from './discount-my-suffix';
import DiscountMySuffixDetail from './discount-my-suffix-detail';
import DiscountMySuffixUpdate from './discount-my-suffix-update';
import DiscountMySuffixDeleteDialog from './discount-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DiscountMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DiscountMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DiscountMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={DiscountMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DiscountMySuffixDeleteDialog} />
  </>
);

export default Routes;
