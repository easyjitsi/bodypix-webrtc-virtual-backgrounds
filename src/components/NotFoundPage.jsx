import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

class NotFoundPage extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (    
        <div className="App">
            <div className="l-contain">
                <img style={{height: "48px"}} src="https://konnekt.world/images/logo.png" alt="" />
            </div>
            <h1 style={{marginTop: "30px"}}> Page Not Found.</h1>
        </div>
    );
    }
}


export default NotFoundPage;