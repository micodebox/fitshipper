import { BrowserRouter as Router, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { AppProvidersProps } from './AppProviders.types';

export const AppProviders = ({ children }: AppProvidersProps) => (
  <Router>
    <QueryParamProvider ReactRouterRoute={Route}>{children}</QueryParamProvider>
  </Router>
);
