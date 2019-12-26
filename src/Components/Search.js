import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const baseUrl = "" //process.env.PUBLIC_URL;

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
    getSearchSuggestions(e);
  }

  const resetInputField = () => {
    setSearchValue("");
  }

  const getSearchSuggestions = e => {
    if(!e.target.value) setSearchSuggestions([]);
    fetch(`https://www.omdbapi.com/?s=${e.target.value}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setSearchSuggestions(jsonResponse.Search.map(movie => movie.Title));
        } else {
          setSearchSuggestions([]);
        }
      });
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    if (!searchValue) return;

    props.history.push(baseUrl + "/search/" + searchValue);
    props.search(searchValue);
    // resetInputField();
  }

  return (
    <form className="search" onSubmit={callSearchFunction}>
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
        placeholder="Query"
        onInput={getSearchSuggestions}
        list="suggestions"
      />
      {
        searchSuggestions.length > 0 ?
          <datalist id="suggestions">
            {searchSuggestions.map((title, i) => (<option key={i} value={title}></option>))}
          </datalist>
          : null
      }
      <Link className="submitSearch" onClick={callSearchFunction} to={"/search/" + searchValue.trim()}>Search</Link>
    </form>
  );
}

export default withRouter(Search);