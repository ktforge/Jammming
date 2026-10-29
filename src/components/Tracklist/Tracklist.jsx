import styles from "./Tracklist.module.css";
import Track from "../Track/Track";

// defaults to an empty list so nothing breaks before tracks are passed in
function Tracklist({
  tracks = [],
  onAdd,
  onRemove,
  playingId,
  onTogglePreview,
}) {
  return (
    <div className={styles.tracklist}>
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onAdd={onAdd}
          onRemove={onRemove}
          // each row only needs to know if it's the one playing
          isPlaying={track.id === playingId}
          onTogglePreview={onTogglePreview}
        />
      ))}
    </div>
  );
}

export default Tracklist;
