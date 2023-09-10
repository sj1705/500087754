import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllTrains from './AllTrains';
import SingleTrain from './SingleTrain';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AllTrains} />
        <Route path="/train/:trainNumber" component={SingleTrain} />
      </Switch>
    </Router>
  );
}

export default App;
