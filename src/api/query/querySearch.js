import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query !== "") {
      axios
        .get(`https://example.com/api/search?q=${query}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [query]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleQueryChange} />
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
