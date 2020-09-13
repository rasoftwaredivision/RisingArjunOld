import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FundamentaldetailMySuffix from './fundamentaldetail-my-suffix';
import FundamentaldetailMySuffixDetail from './fundamentaldetail-my-suffix-detail';
import FundamentaldetailMySuffixUpdate from './fundamentaldetail-my-suffix-update';
import FundamentaldetailMySuffixDeleteDialog from './fundamentaldetail-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FundamentaldetailMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FundamentaldetailMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FundamentaldetailMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={FundamentaldetailMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FundamentaldetailMySuffixDeleteDialog} />
  </>
);

export default Routes;
