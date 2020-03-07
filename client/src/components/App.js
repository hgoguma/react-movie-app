import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './views/MainPage';
import HomePage from './views/HomePage';
import SignUpPage from './views/user/SignUpPage';
import LoginPage from './views/user/LoginPage';
import RankPage from './views/movie/RankPage';



function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Switch>
          <Route exact path="/" component={ MainPage } />
          <Route exact path="/home" component={ HomePage } />
          <Route exact path="/signup" component={ SignUpPage } />
          <Route exact path="/login" component={ LoginPage } />
          <Route exact path="/rank" component={ RankPage } />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
