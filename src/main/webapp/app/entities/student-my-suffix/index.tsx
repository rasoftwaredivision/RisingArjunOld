import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StudentMySuffix from './student-my-suffix';
import StudentMySuffixDetail from './student-my-suffix-detail';
import StudentMySuffixUpdate from './student-my-suffix-update';
import StudentMySuffixDeleteDialog from './student-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StudentMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StudentMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StudentMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={StudentMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StudentMySuffixDeleteDialog} />
  </>
);

export default Routes;
