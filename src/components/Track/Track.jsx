import styles from "./Track.module.css";

// one song row with an add or remove button
function Track({ track, onAdd, onRemove }) {
  return (
    <div className={styles.track}>
      <div>
        <h3 className={styles.name}>{track.name}</h3>
        <p className={styles.details}>
          {track.artist} | {track.album}
        </p>
      </div>
      {/* results pass onAdd, the playlist passes onRemove, so each side gets its own button */}
      {onAdd && (
        <button className={styles.action} onClick={() => onAdd(track)}>
          +
        </button>
      )}
      {onRemove && (
        <button className={styles.action} onClick={() => onRemove(track)}>
          -
        </button>
      )}
    </div>
  );
}

export default Track;
