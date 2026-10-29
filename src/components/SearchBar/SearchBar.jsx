import styles from './SearchBar.module.css';

// search box and button, not hooked up yet
function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <input className={styles.input} placeholder="Enter a song title" />
      <button className={styles.button}>Search</button>
    </div>
  );
}

export default SearchBar;