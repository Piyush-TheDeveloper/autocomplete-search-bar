import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      setSearchResults(cache[input]);
      return;
    }

    const data = await fetch(
      `https://dummyjson.com/products/search?q=${input}`
    );
    const response = await data.json();
    setSearchResults(response?.products);
    setCache((prev) => ({ ...prev, [input]: response?.products }));
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className="App">
      <h1>AutoComplete Search Bar</h1>
      <h3>Search below for products to see suggestions...</h3>
      <div>
        <input
          className="search-bar"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowResults(e.target.value.length > 0);
          }}
          onFocus={() => input && setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
      </div>
      {showResults && (
        <div className="result-container">
          {searchResults.length > 0 ? (
            searchResults.map((results) => (
              <p key={results.id} className="result">
                {results?.title}
                <img src={results?.thumbnail} className="result-img" />
              </p>
            ))
          ) : (
            <p>No Result found</p>
          )}
        </div>
      )}
    </div>
  );
}
