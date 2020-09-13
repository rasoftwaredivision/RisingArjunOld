import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StudentscoreMySuffix from './studentscore-my-suffix';
import StudentscoreMySuffixDetail from './studentscore-my-suffix-detail';
import StudentscoreMySuffixUpdate from './studentscore-my-suffix-update';
import StudentscoreMySuffixDeleteDialog from './studentscore-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StudentscoreMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StudentscoreMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StudentscoreMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={StudentscoreMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StudentscoreMySuffixDeleteDialog} />
  </>
);

export default Routes;
