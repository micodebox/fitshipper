import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/Dashboard';
import { AddressDetailsContainer } from '../addressDetails/AddressDetailsContainer';
import { AddressesContainer } from '../addresses/AddressesContainer';
import { NewAddressContainer } from '../newAddress/NewAddressContainer';
import { AppRoute } from './AppRoutes.enum';

export const AppRoutes = () => (
  <BrowserRouter>
    <DashboardLayout>
      <Switch>
        <Route exact path={AppRoute.addresses} component={AddressesContainer} />
        <Route path={AppRoute.addressDetails} component={AddressDetailsContainer} />
        <Route path={AppRoute.newAddress} component={NewAddressContainer} />
        <Redirect to={AppRoute.addresses} />
      </Switch>
    </DashboardLayout>
  </BrowserRouter>
);
