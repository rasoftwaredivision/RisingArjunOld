import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EnterpriseMySuffix from './enterprise-my-suffix';
import EnterpriseMySuffixDetail from './enterprise-my-suffix-detail';
import EnterpriseMySuffixUpdate from './enterprise-my-suffix-update';
import EnterpriseMySuffixDeleteDialog from './enterprise-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EnterpriseMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EnterpriseMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EnterpriseMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={EnterpriseMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EnterpriseMySuffixDeleteDialog} />
  </>
);

export default Routes;
