import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import Boards from '../Boards/Boards';
import BoardPage from '../BoardPage/BoardPage';
import PageNotFound from "../ErrorPage/PageNotFound";
import PrivateRoute from "../ErrorPage/PrivateRoute";

function App() {

    return (
        <Router>
            <Switch>
                <Route path='/' exact={true} component={Home}/>
                <Route path='/auth' exact={true} component={Auth}/>
                <PrivateRoute path='/boards' exact={true} component={Boards}/>
                <PrivateRoute path='/board' exact={true} component={BoardPage}/>
                <Route component={PageNotFound}/>
            </Switch>
        </Router>
    );
}

export default App;
