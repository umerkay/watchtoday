import React, { useEffect, useReducer } from 'react';
import { reducer, initialState } from '../MovieViewReducer';
import LoadingGif from './loading.gif';

export default function MovieView({ match }) {

  const [state, dispatch] = useReducer(reducer, initialState);

  const { movie, errorMessage, loading } = state;
  console.log(state);

  useEffect(() => {
    loadMovie(match.params.id);
  }, []);

  const loadMovie = async (id) => {
    dispatch({
      type: "LOAD_MOVIE_REQUEST"
    });

    try {
      const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=4a3b711b&plot=full`);
      const data = await res.json();
      if (data.Response === "True")
        dispatch({
          type: "LOAD_MOVIE_SUCCESS",
          payload: { movie: data }
        });
      else dispatch({ type: "LOAD_MOVIE_FAILURE", error: data.Error });
    } catch (err) {
      dispatch({ type: "LOAD_MOVIE_FAILURE", error: "Something went really, really wrong" });
    }
  }
  const { Title, Poster, Genre, Type, Year, Rated, Plot, Language, imdbRating, imdbID } = movie || {};
  return (
    <div className="movieview">
      {
        loading ?
          <div className="loading">
            <span className="loading">loading... </span>
            <img width="50" src={LoadingGif} alt="" />
          </div>
          : movie ? (
            <div className="brand">
              <div className="poster">
                <span className="posterimgcontainer">
                  <img src={Poster} alt="" />
                </span>
              </div>
              <div className="info">
                <div className="title">{Title}</div>
                <span className="rated">{Rated}</span>
                <div className="info1">
                  <span style={{ fontStyle: "italic" }}>{Type}</span> {Year}
                </div>
                <br />
                <div className="genre">{Genre}</div>
                <div className="language">{Language}</div>
                <div className="plot">{Plot}</div>
                <a className="imdbRating" href={`https://www.imdb.com/title/${imdbID}`}>IMDB Rating {imdbRating}</a>
              </div>
            </div>) : null
      }
    </div>
  )
}
