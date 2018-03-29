import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Home from '../views/Home';
import Login from '../views/Login';
import NoMatch from '../views/NoMatch';
import Footer from '../views/Footer';
import Question from '../views/Question';
import Personal from '../views/Personal';
import MyQuestion from '../views/MyQuestion';
import MyReply from '../views/MyReply';
import Message from '../views/Message';
import Collection from '../views/Collection';
import Follow from '../views/Follow';
import QuestionDetail from '../views/QuestionDetail';
import ReplyDetail from '../views/ReplyDetail';
import './index.less';
import RootReducer from '../reducers';


class App extends Component {
  render() {
    const store = createStore(RootReducer);

    return (
      <Provider store={store} >
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/myQuestion" component={MyQuestion} />
            <Route exact path="/myReply" component={MyReply} />
            <Route exact path="/message" component={Message} />
            <Route exact path="/collection" component={Collection} />
            <Route exact path="/follow" component={Follow} />
            <Route exact path="/question/:id/:title" component={QuestionDetail} />
            <Route exact path="/reply/:id/:title" component={ReplyDetail} />
            <Footer>
              <Route exact path="/" component={Home} />
              <Route exact path="/question" component={Question} />
              <Route exact path="/personal" component={Personal} />
            </Footer>
            <Route component={NoMatch} />
          </Switch>
        </Router>  
      </Provider>
    );
  }
}

export default App;
