import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SubjectsbasefeeMySuffix from './subjectsbasefee-my-suffix';
import SubjectsbasefeeMySuffixDetail from './subjectsbasefee-my-suffix-detail';
import SubjectsbasefeeMySuffixUpdate from './subjectsbasefee-my-suffix-update';
import SubjectsbasefeeMySuffixDeleteDialog from './subjectsbasefee-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SubjectsbasefeeMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SubjectsbasefeeMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SubjectsbasefeeMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={SubjectsbasefeeMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SubjectsbasefeeMySuffixDeleteDialog} />
  </>
);

export default Routes;
