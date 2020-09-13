import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserdetailMySuffix from './userdetail-my-suffix';
import UserdetailMySuffixDetail from './userdetail-my-suffix-detail';
import UserdetailMySuffixUpdate from './userdetail-my-suffix-update';
import UserdetailMySuffixDeleteDialog from './userdetail-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserdetailMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserdetailMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserdetailMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserdetailMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserdetailMySuffixDeleteDialog} />
  </>
);

export default Routes;
