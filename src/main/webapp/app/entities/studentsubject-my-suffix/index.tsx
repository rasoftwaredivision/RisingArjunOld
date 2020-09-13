import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StudentsubjectMySuffix from './studentsubject-my-suffix';
import StudentsubjectMySuffixDetail from './studentsubject-my-suffix-detail';
import StudentsubjectMySuffixUpdate from './studentsubject-my-suffix-update';
import StudentsubjectMySuffixDeleteDialog from './studentsubject-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StudentsubjectMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StudentsubjectMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StudentsubjectMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={StudentsubjectMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StudentsubjectMySuffixDeleteDialog} />
  </>
);

export default Routes;
