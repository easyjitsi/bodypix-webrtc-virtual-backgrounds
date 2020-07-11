import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import StartPage from "./StartPage";

class Routes extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (<Router>
            <Switch>
            <Route exact path={`${process.env.PUBLIC_URL + "/"}`} component={StartPage} />
              <Route exact component={NotFoundPage} />
            </Switch>
        </Router>);
    }
}


export default Routes;