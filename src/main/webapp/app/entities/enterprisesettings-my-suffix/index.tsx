import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EnterprisesettingsMySuffix from './enterprisesettings-my-suffix';
import EnterprisesettingsMySuffixDetail from './enterprisesettings-my-suffix-detail';
import EnterprisesettingsMySuffixUpdate from './enterprisesettings-my-suffix-update';
import EnterprisesettingsMySuffixDeleteDialog from './enterprisesettings-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EnterprisesettingsMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EnterprisesettingsMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EnterprisesettingsMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={EnterprisesettingsMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EnterprisesettingsMySuffixDeleteDialog} />
  </>
);

export default Routes;
