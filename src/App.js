import React, { useReducer, useEffect } from "react";

import "./App.scss";

import Header from "./Components/Header";
import MoviesContainer from "./Components/MoviesContainer";
import Search from "./Components/Search";
import MovieView from "./Components/MovieView";

import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import { reducer, initialState } from './Reducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { movies, errorMessage, loading, searchValue, page, totalResults } = state;

  const loadMore = () => {

    dispatch({
      type: "LOAD_MORE_REQUEST"
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue.trim()}&apikey=4a3b711b&page=${page + 1}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          movies.push(...jsonResponse.Search);
          dispatch({
            type: "LOAD_MORE_SUCCESS",
            payload: { movies: movies, page: page + 1 }
          })
        } else {
          dispatch({
            type: "LOAD_MORE_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  }

  useBottomScrollListener(() => {
    if (searchValue && totalResults > movies.length)
      loadMore();
  });

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue.trim()}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: { movies: jsonResponse.Search, page: 1, searchValue, totalResults: jsonResponse.totalResults }
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  };

  const baseUrl = "" //process.env.PUBLIC_URL;

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={baseUrl + "/"} exact render={props => (<>
            <Header focus={true} />
            <Search search={search} />
          </>
          )}></Route>

          <Route path={baseUrl + "/search/:q/:page?"} render={props => (<>
            <Header focus={!movies.length && !loading} />
            <Search search={search} />
            <MoviesContainer
              errorMessage={errorMessage}
              movies={movies}
              loading={loading}
              search={search}
              {...props}
              >
            </MoviesContainer>
          </>
          )}></Route>

          <Route path={baseUrl + "/movie/:id"} render={props => (<>
            <Header focus={false} />
            <Search search={search} />
            <MovieView
              {...props}
            >
            </MovieView>
          </>
          )}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;