import styles from "./Track.module.css";

// one song row with a preview button and an add or remove button
function Track({ track, onAdd, onRemove, isPlaying, onTogglePreview }) {
  return (
    <div className={styles.track}>
      {/* only songs with a clip get a play button, the spacer keeps rows lined up */}
      {track.preview ? (
        <button
          className={styles.preview}
          onClick={() => onTogglePreview(track)}
          aria-label={`${isPlaying ? "Pause" : "Play"} preview of ${track.name}`}
        >
          {isPlaying ? "\u275A\u275A" : "\u25B6\uFE0E"}
        </button>
      ) : (
        <span className={styles.noPreview} />
      )}
      <div className={styles.info}>
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
