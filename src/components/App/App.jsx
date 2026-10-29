import { useState } from "react";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Deezer from "../../util/Deezer";

// top level, holds every other piece of the page
function App() {
  // filled in by deezer search
  const [searchResults, setSearchResults] = useState([]);

  // name shown at the top of the playlist panel
  const [playlistName, setPlaylistName] = useState("New Playlist");

  // songs the user has added from the results
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // adds a song from the results, skips it if it's already in the playlist
  function addTrack(track) {
    if (playlistTracks.some((saved) => saved.id === track.id)) return;
    setPlaylistTracks([...playlistTracks, track]);
  }

  // drops a song from the playlist by matching its id
  function removeTrack(track) {
    setPlaylistTracks(playlistTracks.filter((saved) => saved.id !== track.id));
  }

  // runs on every keystroke in the playlist name box
  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  // asks deezer for songs and shows them in the results panel
  async function search(term) {
    if (!term.trim()) return;
    try {
      const results = await Deezer.search(term);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <SearchBar onSearch={search} />
      {/* results on the left, playlist on the right */}
      <div className={styles.lists}>
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
        />
      </div>
    </div>
  );
}

export default App;
