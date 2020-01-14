import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import ErrorBoundary from "./error-boundary";
import MovieList from "./components/movie-list";
import MovieDetail from "./components/movie-detail";
import MovieDb from "./components/moviedb";
import "./normalize.css";
import "./styles.css";

function App() {
  return (
    <div className="App">
        <ErrorBoundary>
            <MovieDb>
                <BrowserRouter basename="/">
                    <Switch>
                        <Route path="/movie/:id" component={MovieDetail} />
                        <Route path="/" component={MovieList} />
                    </Switch>
                </BrowserRouter>
            </MovieDb>
        </ErrorBoundary>
    </div>
  );
}

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);
root.render(<App />);
