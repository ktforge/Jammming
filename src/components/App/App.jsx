import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

// top level, holds every other piece of the page
function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <SearchBar />
      {/* results on the left, playlist on the right */}
      <div className={styles.lists}>
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
}

export default App;