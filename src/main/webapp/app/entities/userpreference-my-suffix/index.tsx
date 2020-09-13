import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserpreferenceMySuffix from './userpreference-my-suffix';
import UserpreferenceMySuffixDetail from './userpreference-my-suffix-detail';
import UserpreferenceMySuffixUpdate from './userpreference-my-suffix-update';
import UserpreferenceMySuffixDeleteDialog from './userpreference-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserpreferenceMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserpreferenceMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserpreferenceMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserpreferenceMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserpreferenceMySuffixDeleteDialog} />
  </>
);

export default Routes;
