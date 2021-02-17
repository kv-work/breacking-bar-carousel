import React from 'react';
import EpisodeCardProps from './EpisodeCard.types';

import styles from './EpisodeCard.module.scss';

const CharacterCard: React.FC<EpisodeCardProps> = (props) => {
  const { data } = props;

  return (
    <li className={styles.episodeCard} >
      <div className={styles.cardImage}></div>
      <div className={styles.title}>s{data.season}e{data.episode}: {data.title}</div>
    </li>
  );
};

export default CharacterCard;
