import styles from "./SearchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";

// left panel that shows songs from a search
function SearchResults({ searchResults, onAdd }) {
  return (
    <div className={styles.searchResults}>
      <h2>Results</h2>
      <Tracklist tracks={searchResults} onAdd={onAdd} />
    </div>
  );
}

export default SearchResults;
