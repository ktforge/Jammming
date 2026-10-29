import styles from './Tracklist.module.css';
import Track from '../Track/Track';

// defaults to an empty list so the playlist side doesn't break before it has tracks
function Tracklist({ tracks = [] }) {
  return (
    <div className={styles.tracklist}>
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}

export default Tracklist;