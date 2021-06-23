import React from "react";
import {Route} from "react-router-dom";
import PageNotFound from "./PageNotFound";

const PrivateRoute: React.FC<{
    component: React.FC;
    path: string;
    exact: boolean;
}> = (props) => {

    const isTokenExist = sessionStorage.getItem('jwtToken');

    if (isTokenExist) {
        return <Route path={props.path} exact={props.exact} component={props.component}/>
    } else {
        return <Route component={PageNotFound}/>
    }
}

export default PrivateRoute;