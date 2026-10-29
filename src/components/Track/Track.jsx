import styles from './Track.module.css';

// one song row with an add button
function Track() {
  return (
    <div className={styles.track}>
      <div>
        <h3 className={styles.name}>Song Name</h3>
        <p className={styles.details}>Artist | Album</p>
      </div>
      <button className={styles.action}>+</button>
    </div>
  );
}

export default Track;