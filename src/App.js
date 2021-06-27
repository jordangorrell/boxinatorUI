import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import BoxFormView from './views/BoxFormView';
import DispatchesListView from './views/DispatchesListView';
import Loader from './components/UI/Loader';

import actionTypes from './store/actionTypes';
import urlExtensions from './routing/urlExtensions';
import API_BASE_URL from './store/baseURL';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial boxes from DB when loading page
  useEffect(() => {
    // Show loader until fetch complete
    setIsLoading(true);
    fetch(API_BASE_URL)
      .then(response => response.json()
        // Put boxes into store
        .then(boxes => dispatch({ type: actionTypes.ADD_BOXES, newBoxes: boxes })))
        // Turn off loader
      .finally(() => setIsLoading(false))
  }, [dispatch])

  return (
    <Fragment>
      {
        isLoading ?
        <div className="loader-container">
          <Loader size={30} color="#CCC" />
        </div> 
        :
        <Router>
          <h1 className="main-heading">Boxinator</h1>
          <Switch>
            <Route exact path='/'>
              <Redirect to={urlExtensions.ADD_BOX} />
            </Route>
            <Route path={urlExtensions.ADD_BOX}>
              <BoxFormView />
            </Route>
            <Route path={urlExtensions.LIST_BOXES}>
              <DispatchesListView />
            </Route>
          </Switch>
        </Router>
      }
    </Fragment>
  );
}

export default App;
