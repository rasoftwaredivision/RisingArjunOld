import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RoleaccessMySuffix from './roleaccess-my-suffix';
import RoleaccessMySuffixDetail from './roleaccess-my-suffix-detail';
import RoleaccessMySuffixUpdate from './roleaccess-my-suffix-update';
import RoleaccessMySuffixDeleteDialog from './roleaccess-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RoleaccessMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RoleaccessMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RoleaccessMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={RoleaccessMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RoleaccessMySuffixDeleteDialog} />
  </>
);

export default Routes;
