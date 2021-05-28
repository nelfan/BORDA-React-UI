import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Auth/Login/Login';
import Home from '../Home/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/login' exact={true} component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
