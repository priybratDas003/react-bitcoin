import React from 'react';
import './App.css';
// import Show from './components/showCurrent';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import store from './store/store';
import {Provider} from 'react-redux';
import Login from './components/login';
import Instruction from './components/instruction';
import bitCoinAnalytics from './components/analytics';
class App extends React.Component
{
  render()
  {
    return (
      <Provider store={store}>
            <BrowserRouter >
            <Switch>
              <Route path='/analytics' component={bitCoinAnalytics}></Route>
              <Route path='/login' component={Login}></Route>
              <Route path='/instructions' component={Instruction}></Route>
              <Route path='/' component={Login}></Route>
              </Switch>
            </BrowserRouter>
      </Provider>);
  }
}
export default App;