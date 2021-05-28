import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from '../Auth/Register/Register';
import Login from '../Auth/Login/Login';
import Home from '../Home/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/register' exact={true} component={Register} />
        <Route path='/login' exact={true} component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
