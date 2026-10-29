import styles from './Tracklist.module.css';
import Track from '../Track/Track';

// list of tracks, three placeholders for now
function Tracklist() {
  return (
    <div className={styles.tracklist}>
      <Track />
      <Track />
      <Track />
    </div>
  );
}

export default Tracklist;