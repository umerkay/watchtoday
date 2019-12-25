import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    if (!searchValue) return;

    props.history.push("/search/" + searchValue);
    props.search(searchValue);
    resetInputField();
  }

  return (
    <form className="search" onSubmit={callSearchFunction}>
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
        placeholder="Query"
      />
      <Link className="submitSearch" onClick={callSearchFunction} to={"/search/" + searchValue.trim()}>Search</Link>
    </form>
  );
}

export default withRouter(Search);