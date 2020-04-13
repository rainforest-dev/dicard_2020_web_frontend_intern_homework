import React from 'react';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import './App.css';

import Home from './pages/home/Home';
import Post from './pages/Post';

import Modal from './components/Modal';

function App() {
  const history = useHistory();
  const location = useLocation();
  const isModal = location.state && location.state.isModal;
  return (
    <>
      {isModal && (<Route path="/f/:forumAlias/p/:id">
        <Modal
          visible={true}
          component={(
            <>
              {"Modal"}
              <Post />
            </>
          )}
          onCancel={() => history.goBack()}
        />
      </Route>)}
      <Switch location={isModal || location}>
        <Route path="/f/:forumAlias/p/:id">
          <Post />
        </Route>
        <Route exact path="/f">
          <Home />
        </Route>
        <Route path="/">
          <Redirect to="/f" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
