import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CourseMySuffix from './course-my-suffix';
import CourseMySuffixDetail from './course-my-suffix-detail';
import CourseMySuffixUpdate from './course-my-suffix-update';
import CourseMySuffixDeleteDialog from './course-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CourseMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CourseMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CourseMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={CourseMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CourseMySuffixDeleteDialog} />
  </>
);

export default Routes;
