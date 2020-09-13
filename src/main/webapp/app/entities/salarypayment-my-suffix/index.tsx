import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SalarypaymentMySuffix from './salarypayment-my-suffix';
import SalarypaymentMySuffixDetail from './salarypayment-my-suffix-detail';
import SalarypaymentMySuffixUpdate from './salarypayment-my-suffix-update';
import SalarypaymentMySuffixDeleteDialog from './salarypayment-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SalarypaymentMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SalarypaymentMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SalarypaymentMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={SalarypaymentMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SalarypaymentMySuffixDeleteDialog} />
  </>
);

export default Routes;
