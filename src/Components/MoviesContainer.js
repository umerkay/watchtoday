import React, { useEffect } from 'react';
import LoadingGif from './loading.gif';
import Movie from './Movie';

export default function MoviesContainer({ loading, errorMessage, movies, search, match }) {

  useEffect(() => {
    search(match.params.q)
  }, []);

  return (
    <div className="moviesContainer">
      <div className="movies">
        {movies.map((movie, index) => (
          <Movie key={movie.imdbID} movie={movie} />
        ))}
      </div>
      <div className="info">
        {loading && !errorMessage ? (
          <>
            <span className="loading">loading... </span>
            <img width="50" src={LoadingGif} alt="" />
          </>
        ) : errorMessage ? (
          <div className="errorMessage">Sorry, the search could not be made because the server returned an error: {errorMessage}</div>
        ) : null
        }
      </div>
    </div>
  )
}
