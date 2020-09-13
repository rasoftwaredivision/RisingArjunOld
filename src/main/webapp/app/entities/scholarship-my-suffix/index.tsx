import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ScholarshipMySuffix from './scholarship-my-suffix';
import ScholarshipMySuffixDetail from './scholarship-my-suffix-detail';
import ScholarshipMySuffixUpdate from './scholarship-my-suffix-update';
import ScholarshipMySuffixDeleteDialog from './scholarship-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ScholarshipMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ScholarshipMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ScholarshipMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={ScholarshipMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ScholarshipMySuffixDeleteDialog} />
  </>
);

export default Routes;
