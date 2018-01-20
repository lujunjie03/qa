import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../Home';
import Login from '../Login';
import NoMatch from '../NoMatch';
import Footer from '../Footer';
import Question from '../Question';
import Personal from '../Personal';
import MyQuestion from '../MyQuestion';
import MyReply from '../MyReply';
import Message from '../Message';
import Collection from '../Collection';
import Follow from '../Follow';
import QuestionDetail from '../QuestionDetail';
import './index.less';

class App extends Component {
  render() {
    return (
      <Router>
      	<Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/myQuestion" component={MyQuestion} />
          <Route exact path="/myReply" component={MyReply} />
          <Route exact path="/message" component={Message} />
          <Route exact path="/collection" component={Collection} />
          <Route exact path="/follow" component={Follow} />
          <Route exact path="/question/:id/:title" component={QuestionDetail} />
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
