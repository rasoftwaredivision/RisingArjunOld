import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AcademicsessionMySuffix from './academicsession-my-suffix';
import AcademicsessionMySuffixDetail from './academicsession-my-suffix-detail';
import AcademicsessionMySuffixUpdate from './academicsession-my-suffix-update';
import AcademicsessionMySuffixDeleteDialog from './academicsession-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AcademicsessionMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AcademicsessionMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AcademicsessionMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={AcademicsessionMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AcademicsessionMySuffixDeleteDialog} />
  </>
);

export default Routes;
