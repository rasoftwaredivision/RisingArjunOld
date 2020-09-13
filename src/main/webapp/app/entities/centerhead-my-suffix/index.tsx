import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CenterheadMySuffix from './centerhead-my-suffix';
import CenterheadMySuffixDetail from './centerhead-my-suffix-detail';
import CenterheadMySuffixUpdate from './centerhead-my-suffix-update';
import CenterheadMySuffixDeleteDialog from './centerhead-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CenterheadMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CenterheadMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CenterheadMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={CenterheadMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CenterheadMySuffixDeleteDialog} />
  </>
);

export default Routes;
