import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TeachershareMySuffix from './teachershare-my-suffix';
import TeachershareMySuffixDetail from './teachershare-my-suffix-detail';
import TeachershareMySuffixUpdate from './teachershare-my-suffix-update';
import TeachershareMySuffixDeleteDialog from './teachershare-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TeachershareMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TeachershareMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TeachershareMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={TeachershareMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TeachershareMySuffixDeleteDialog} />
  </>
);

export default Routes;
