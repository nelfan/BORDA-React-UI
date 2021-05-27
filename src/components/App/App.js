import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from '../Auth/Register/Register';
import Home from '../Home/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/register' exact={true} component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
