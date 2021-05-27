import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Auth/Login/Login';
import Home from '../Home/Home';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import Auth from '../Auth/Auth';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/auth' exact={true} component={Auth} />
        <Route path='/login' exact={true} component={Login} />
        <Route path='/register' exact={true} component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
