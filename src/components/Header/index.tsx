import * as React from 'react';
import styles from './styles.module.scss';

type HeaderProps = {
  // TODO: set image string
}

const Header = () => {
  return (
    <div className={styles.wrapper} >
      <div className={styles.title} >
        <p>Puzzle</p>
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Paste your image URL here" />
        <button>Go</button>
      </div>
    </div>
  );
}

export default Header;
