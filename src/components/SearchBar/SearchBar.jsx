import { useState } from "react";
import styles from "./SearchBar.module.css";

// search box that sends the typed term up to App
function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  // a form submit covers both clicking Search and pressing Enter
  function handleSubmit(e) {
    e.preventDefault();
    onSearch(term);
  }

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Enter a song or artist"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
