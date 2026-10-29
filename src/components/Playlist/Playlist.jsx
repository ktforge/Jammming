import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';

// right panel where the custom playlist gets built
function Playlist({ playlistName, playlistTracks, onRemove, onNameChange }) {
  return (
    <div className={styles.playlist}>
      {/* value comes from App, so typing sends the new name back up */}
      <input
        className={styles.name}
        value={playlistName}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} />
    </div>
  );
}

export default Playlist;
