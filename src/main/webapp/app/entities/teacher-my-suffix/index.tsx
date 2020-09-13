import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TeacherMySuffix from './teacher-my-suffix';
import TeacherMySuffixDetail from './teacher-my-suffix-detail';
import TeacherMySuffixUpdate from './teacher-my-suffix-update';
import TeacherMySuffixDeleteDialog from './teacher-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TeacherMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TeacherMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TeacherMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={TeacherMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TeacherMySuffixDeleteDialog} />
  </>
);

export default Routes;
