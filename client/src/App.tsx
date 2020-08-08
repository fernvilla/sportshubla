import React, { FC, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import store from 'store';
import setAuthToken from './utils/auth';
import { setCurrentUser, logoutUser } from './actions/authActions';
import reduxStore from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import { Token } from './interfaces/token';
import Home from './pages/Home';
import NotFound from './components/NotFound';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Admin from './pages/Admin';
import axios from 'axios';
import { League } from './interfaces/league';

import './app.scss';
import Team from './pages/Team';

const jwtToken = store.get('jwtToken');

if (jwtToken) {
  setAuthToken(jwtToken);

  const decoded = jwt_decode<Token>(jwtToken);

  reduxStore.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    reduxStore.dispatch(logoutUser());
    window.location.href = '/';
  }
}

const App: FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);

  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagues = async () => {
    try {
      const { data } = await axios.get('/api/leagues');

      setLeagues(data.payload);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  return (
    <Router>
      <SiteLayout leagues={leagues}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/teams/:slug" exact component={Team} />
          <PrivateRoute path="/admin" exact component={Admin} adminRequired />
          <Route component={NotFound} />
        </Switch>
      </SiteLayout>
    </Router>
  );
};

export default App;
