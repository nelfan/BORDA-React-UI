import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import Boards from '../Boards/Boards';

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/auth' exact={true} component={Auth} />
        <Route path='/login' exact={true} component={Login} />
        <Route path='/register' exact={true} component={Register} />
        <Route path='/boards' exact={true} component={Boards} />
      </Switch>
    </Router>
  );
}

export default App;
