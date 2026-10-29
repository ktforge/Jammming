import styles from "./Tracklist.module.css";
import Track from "../Track/Track";

// defaults to an empty list so nothing breaks before tracks are passed in
function Tracklist({ tracks = [], onAdd, onRemove }) {
  return (
    <div className={styles.tracklist}>
      {tracks.map((track) => (
        <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default Tracklist;
