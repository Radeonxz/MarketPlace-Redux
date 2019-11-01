import React, { Component } from 'react';
// import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import AppNavbar from './components/AppNavbar/AppNavbar';
import UsersList from './pages/UsersList/UsersList';
import MyProjectsView from './containers/MyProjectsPage';
// import ShoppingList from './components/ShoppingList';
// import ItemModal from './components/ItemModal';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    const token = store.getState().auth.token;
    if (token) {
      store.dispatch(loadUser());
    }
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Provider store={store}>
            <div className="App">
              <AppNavbar />
              <Switch>
                <Route exact path="/">
                  <UsersList />
                </Route>
                <Route path="/myprojects">
                  <MyProjectsView />
                </Route>
              </Switch>
              {/* <Container> */}
              {/* <ItemModal/> */}
              {/* <ShoppingList/> */}
              {/* <UsersList /> */}
              {/* </Container> */}
            </div>
          </Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
