import React from 'react';
import DriverList from './pages/Drivers/DriversList';
import Driver from './pages/Drivers/Driver';
import DriverNew from './pages/Drivers/DriverNew';
import DriverEdit from './pages/Drivers/DriverEdit';
import RidesNew from './pages/Rides/RidesNew';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './services/api';

function App() {
  return(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={DriverList} />
          <Route path="/drivers/new" exact={true} component={DriverNew} />
          <Route path="/drivers/edit/:id" exact={true} component={DriverEdit} />
          <Route path="/drivers/:id" exact={true} component={Driver} />
          <Route path="/drivers" exact={true} component={DriverList} /> 
          <Route path="/ride/new" exact={true} component={RidesNew} /> 
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
