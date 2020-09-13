import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FeatureMySuffix from './feature-my-suffix';
import FeatureMySuffixDetail from './feature-my-suffix-detail';
import FeatureMySuffixUpdate from './feature-my-suffix-update';
import FeatureMySuffixDeleteDialog from './feature-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FeatureMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FeatureMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FeatureMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={FeatureMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FeatureMySuffixDeleteDialog} />
  </>
);

export default Routes;
