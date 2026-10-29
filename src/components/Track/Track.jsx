import styles from './Track.module.css';

// one song row with an add button
function Track({ track, onAdd }) {
  return (
    <div className={styles.track}>
      <div>
        <h3 className={styles.name}>{track.name}</h3>
        <p className={styles.details}>
          {track.artist} | {track.album}
        </p>
      </div>
      {/* only results get a + button, playlist rows get a - in the next step */}
      {onAdd && (
        <button className={styles.action} onClick={() => onAdd(track)}>
          +
        </button>
      )}
    </div>
  );
}

export default Track;
