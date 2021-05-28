import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Boards from '../Boards/Boards';

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/boards' exact={true} component={Boards} />
      </Switch>
    </Router>
  );
}

export default App;
