import { useEffect, useRef, useState } from "react";
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

  // id of the song whose preview is playing, null when nothing is
  const [playingId, setPlayingId] = useState(null);

  // one shared player so only one preview plays at a time
  const audioRef = useRef(null);

  // sets up the player once, and resets the button when a clip ends
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    const handleEnded = () => setPlayingId(null);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, []);

  // stops whatever preview is playing
  function stopPreview() {
    audioRef.current?.pause();
    setPlayingId(null);
  }

  // plays a song's preview, or pauses it if it's already the one playing
  function togglePreview(track) {
    if (playingId === track.id) {
      stopPreview();
      return;
    }
    const audio = audioRef.current;
    // swapping the src stops the old clip on its own
    audio.src = track.preview;
    setPlayingId(track.id);
    // play() fails if the link expired or the network drops, so reset the button
    audio.play().catch((error) => {
      console.error(error);
      setPlayingId(null);
    });
  }

  // adds a song from the results, skips it if it's already in the playlist
  function addTrack(track) {
    if (playlistTracks.some((saved) => saved.id === track.id)) return;
    setPlaylistTracks([...playlistTracks, track]);
  }

  // drops a song from the playlist by matching its id
  function removeTrack(track) {
    if (track.id === playingId) stopPreview();
    setPlaylistTracks(playlistTracks.filter((saved) => saved.id !== track.id));
  }

  // runs on every keystroke in the playlist name box
  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  // asks deezer for songs and shows them in the results panel
  async function search(term) {
    if (!term.trim()) return;
    stopPreview();
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
        <SearchResults
          searchResults={searchResults}
          onAdd={addTrack}
          playingId={playingId}
          onTogglePreview={togglePreview}
        />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          playingId={playingId}
          onTogglePreview={togglePreview}
        />
      </div>
    </div>
  );
}

export default App;
