import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';

// left panel that shows songs from a search
function SearchResults() {
  return (
    <div className={styles.searchResults}>
      <h2>Results</h2>
      <Tracklist />
    </div>
  );
}

export default SearchResults;