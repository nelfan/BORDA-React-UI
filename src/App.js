import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/auth' exact={true} component={Auth} />
      </Switch>
    </Router>
  );
}

export default App;
