import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, HttpLink, InMemoryCache }  from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
import rootReducer from './reducers'
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';

const client = new ApolloClient({ 
  link: new HttpLink({ uri: 'http://localhost:3001/graphql' }),
  cache: new InMemoryCache()
});

const store = createStore(rootReducer);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path='/' component={App} />
          <Route path='/edit/:id' component={Edit} />
          <Route path='/create' component={Create} />
          <Route path='/show/:id' component={Show} />
        </div>
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();