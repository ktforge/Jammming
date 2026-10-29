import { useState } from "react";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

// top level, holds every other piece of the page
function App() {
  // fake results until spotify search is hooked up
  const [searchResults] = useState([
    {
      id: "1",
      name: "Way Maker",
      artist: "Leeland",
      album: "Better Word",
      uri: "spotify:track:mock1",
    },
    {
      id: "2",
      name: "Goodness of God",
      artist: "Bethel Music",
      album: "Victory",
      uri: "spotify:track:mock2",
    },
    {
      id: "3",
      name: "Graves Into Gardens",
      artist: "Elevation Worship",
      album: "Graves Into Gardens",
      uri: "spotify:track:mock3",
    },
  ]);

  // name shown at the top of the playlist panel
  const [playlistName, setPlaylistName] = useState("Sunday Worship");

  // songs already in the playlist, fake ones for now
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      id: "4",
      name: "Gratitude",
      artist: "Brandon Lake",
      album: "House of Miracles",
      uri: "spotify:track:mock4",
    },
    {
      id: "5",
      name: "Jireh",
      artist: "Elevation Worship & Maverick City Music",
      album: "Old Church Basement",
      uri: "spotify:track:mock5",
    },
  ]);

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

  // grabs each song's uri for spotify, then clears the playlist
  function savePlaylist() {
    const trackUris = playlistTracks.map((track) => track.uri);
    console.log(`Saving "${playlistName}" with`, trackUris);
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <SearchBar />
      {/* results on the left, playlist on the right */}
      <div className={styles.lists}>
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;
