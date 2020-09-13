import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import JhiauthorityMySuffix from './jhiauthority-my-suffix';
import JhiauthorityMySuffixDetail from './jhiauthority-my-suffix-detail';
import JhiauthorityMySuffixUpdate from './jhiauthority-my-suffix-update';
import JhiauthorityMySuffixDeleteDialog from './jhiauthority-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JhiauthorityMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JhiauthorityMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JhiauthorityMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={JhiauthorityMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={JhiauthorityMySuffixDeleteDialog} />
  </>
);

export default Routes;
