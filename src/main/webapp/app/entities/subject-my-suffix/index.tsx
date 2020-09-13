import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SubjectMySuffix from './subject-my-suffix';
import SubjectMySuffixDetail from './subject-my-suffix-detail';
import SubjectMySuffixUpdate from './subject-my-suffix-update';
import SubjectMySuffixDeleteDialog from './subject-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SubjectMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SubjectMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SubjectMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={SubjectMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SubjectMySuffixDeleteDialog} />
  </>
);

export default Routes;
