/**
 * React Imports
 */
import React from "react";

/**
 * Customized Search Component
 * @param {Object} props
 */
const Search = (props) => {
  /**
   * Submit search handle implementation
   * @param {events} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit();
  };
  return (
    <div className={props.divClass} style={{ display: "flex" }}>
      <form onSubmit={handleSubmit} className="formStyle">
        <input
          className="searchInput"
          type="text"
          id="search"
          name="search"
          value={props.value}
          placeholder="Search"
          onChange={(e) => props.onChange(e)}
        />
        <button type="submit" className="btn btn-sm btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Search;
