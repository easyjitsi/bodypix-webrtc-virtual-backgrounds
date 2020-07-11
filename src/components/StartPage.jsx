import React from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import {Animated} from "react-animated-css";

class StartPage extends React.Component {

    constructor(props){
        super(props);
        this.state  = {
            currentPage: "page1"
        }
    }

    localStorageExample(e){
        e.preventDefault();
        reactLocalStorage.setObject('userObj', {});
        var userObj = reactLocalStorage.getObject('userObj');
    } 

    render() {
        return (    
        <div className="App">
            <div className="p-overlay"></div>
            {
                this.state.currentPage == "page1"
                &&
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={this.state.currentPage == "page1"}>
                    <div className="page1">
                        <h1>Welcome to Dominic's React Starter</h1>
                    </div>
                </Animated>
            }
        </div>
    );
    }
}

export default StartPage;