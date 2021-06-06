import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import Boards from '../Boards/Boards';
import Board from '../Board/Board';

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/auth' exact={true} component={Auth} />
        <Route path='/boards' exact={true} component={Boards} />
        <Route path='/board' exact={true} component={Board} />
      </Switch>
    </Router>
  );
}

export default App;
