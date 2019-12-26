import React from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_PLACEHOLDER_IMAGE =
  "http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png";

const baseUrl = "" //process.env.PUBLIC_URL;

export default function Movie({ movie }) {
  const poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <Link className={"movie " + (movie.Type != "movie" ? movie.Type : "")} to={baseUrl + "/movie/" + movie.imdbID}>
      <h2 className="title" >{movie.Title}</h2>
      <div>
        <img
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
          className='poster'
        />
      </div>
      <p><span style={{ fontStyle: "italic" }}>{movie.Type}</span> {movie.Year}</p>
    </Link>
  );
}