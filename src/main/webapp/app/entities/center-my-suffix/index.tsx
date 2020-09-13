import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CenterMySuffix from './center-my-suffix';
import CenterMySuffixDetail from './center-my-suffix-detail';
import CenterMySuffixUpdate from './center-my-suffix-update';
import CenterMySuffixDeleteDialog from './center-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CenterMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CenterMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CenterMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={CenterMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CenterMySuffixDeleteDialog} />
  </>
);

export default Routes;
