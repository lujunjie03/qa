import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../Home';
import Login from '../Login';
import NoMatch from '../NoMatch';
import Footer from '../Footer';
import Question from '../Question';
import Personal from '../Personal';
import './index.less';

class App extends Component {
  render() {
    return (
      <Router>
      	<Switch>
          <Route exact path="/login" component={Login} />  
          <Footer>
            <Route exact path="/home" component={Home} />
            <Route exact path="/question" component={Question} />
            <Route exact path="/personal" component={Personal} />
          </Footer>
          <Route component={NoMatch} />
      	</Switch>
      </Router>
    );
  }
}

export default App;
