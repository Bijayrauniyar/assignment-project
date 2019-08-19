import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { loginSuccess } from './actions/authActions';

class App extends Component {
  render() {
    store.dispatch(loginSuccess());

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <this.PrivateRoute
                  exact
                  path="/contacts"
                  component={Contacts}
                />
                <this.PrivateRoute
                  exact
                  path="/contact/add"
                  component={AddContact}
                />
                <this.PrivateRoute
                  exact
                  path="/contact/edit/:id"
                  component={EditContact}
                />
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }

  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        store.getState().auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );
}
export default App;
