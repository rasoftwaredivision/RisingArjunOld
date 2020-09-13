import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import QuestionMySuffix from './question-my-suffix';
import QuestionMySuffixDetail from './question-my-suffix-detail';
import QuestionMySuffixUpdate from './question-my-suffix-update';
import QuestionMySuffixDeleteDialog from './question-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QuestionMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QuestionMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QuestionMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={QuestionMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={QuestionMySuffixDeleteDialog} />
  </>
);

export default Routes;
