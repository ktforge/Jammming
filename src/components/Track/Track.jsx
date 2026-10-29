import styles from './Track.module.css';

// one song row with an add button
function Track({ track }) {
  return (
    <div className={styles.track}>
      <div>
        <h3 className={styles.name}>{track.name}</h3>
        <p className={styles.details}>
          {track.artist} | {track.album}
        </p>
      </div>
      <button className={styles.action}>+</button>
    </div>
  );
}

export default Track;
