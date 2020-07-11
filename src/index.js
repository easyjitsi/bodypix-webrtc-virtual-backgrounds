import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Routes from "./components/Routes";
import ClearCache from "react-clear-cache";

function App() {
  return (
    <div className="App">
      <ClearCache auto={true}>
        {({ isLatestVersion, emptyCacheStorage }) => (
          <div>
            {!isLatestVersion && (
              <p style={{color: "white"}}>
                Updating this version ...
              </p>
            )}
            {
              isLatestVersion &&
              <Routes />
            }
          </div>
        )}
      </ClearCache>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);