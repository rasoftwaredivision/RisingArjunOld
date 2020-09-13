import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ExpenseMySuffix from './expense-my-suffix';
import ExpenseMySuffixDetail from './expense-my-suffix-detail';
import ExpenseMySuffixUpdate from './expense-my-suffix-update';
import ExpenseMySuffixDeleteDialog from './expense-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ExpenseMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ExpenseMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ExpenseMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={ExpenseMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ExpenseMySuffixDeleteDialog} />
  </>
);

export default Routes;
