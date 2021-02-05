import React from 'react';
import styles from './mapHeader.less';

export const MapHeader: React.FC = () => (
  <div className={styles.header}>
    <div className={styles.word}>Word</div>
    <div className={styles.transcription}>Transcription</div>
    <div className={styles.translate}>Translate</div>
  </div>
);
