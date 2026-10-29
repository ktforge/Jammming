import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';

// right panel where the custom playlist gets built
function Playlist({ playlistName, playlistTracks }) {
  return (
    <div className={styles.playlist}>
      {/* playlist name, becomes editable in a later step */}
      <input className={styles.name} defaultValue={playlistName} />
      <Tracklist tracks={playlistTracks} />
      <button className={styles.save}>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
