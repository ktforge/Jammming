import { useState } from "react";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

// top level, holds every other piece of the page
function App() {
  // fake results until spotify search is hooked up
  const [searchResults] = useState([
    { id: "1", name: "Way Maker", artist: "Leeland", album: "Better Word" },
    {
      id: "2",
      name: "Goodness of God",
      artist: "Bethel Music",
      album: "Victory",
    },
    {
      id: "3",
      name: "Graves Into Gardens",
      artist: "Elevation Worship",
      album: "Graves Into Gardens",
    },
  ]);
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <SearchBar />
      {/* results on the left, playlist on the right */}
      <div className={styles.lists}>
        <SearchResults searchResults={searchResults} />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
