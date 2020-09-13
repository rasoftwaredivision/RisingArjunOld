import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StudentfeeMySuffix from './studentfee-my-suffix';
import StudentfeeMySuffixDetail from './studentfee-my-suffix-detail';
import StudentfeeMySuffixUpdate from './studentfee-my-suffix-update';
import StudentfeeMySuffixDeleteDialog from './studentfee-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StudentfeeMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StudentfeeMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StudentfeeMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={StudentfeeMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StudentfeeMySuffixDeleteDialog} />
  </>
);

export default Routes;
