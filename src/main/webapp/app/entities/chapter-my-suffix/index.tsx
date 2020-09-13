import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ChapterMySuffix from './chapter-my-suffix';
import ChapterMySuffixDetail from './chapter-my-suffix-detail';
import ChapterMySuffixUpdate from './chapter-my-suffix-update';
import ChapterMySuffixDeleteDialog from './chapter-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChapterMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChapterMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChapterMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={ChapterMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ChapterMySuffixDeleteDialog} />
  </>
);

export default Routes;
