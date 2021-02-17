import React from 'react';
import EpisodeCardProps from './EpisodeCard.types';

import styles from './EpisodeCard.module.scss';

const CharacterCard: React.FC<EpisodeCardProps> = (props) => {
  const { data } = props;

  return (
    <li className={styles.episodeCard} >
      <div className={styles.cardImage}></div>
      <div className={styles.status}>{data.season}</div>
      <div className={styles.nickname}>{data.title}</div>
      <div className={styles.name}>{data.episode}</div>      
    </li>
  );
};

export default CharacterCard;
