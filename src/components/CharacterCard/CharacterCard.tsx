import React from 'react';
import CharacterCardProps from './CharacterCard.types';

import styles from './CharacterCard.module.scss';

const CharacterCard: React.FC<CharacterCardProps> = (props) => {
  const { data } = props;

  const bgStyle = {
    backgroundImage: `url(${data.img})`,
  }

  return (
    <li className={styles.characterCard} >
      <div className={styles.cardImage} style={bgStyle}></div>
      <div className={styles.status}>{data.status}</div>
      <div className={styles.nickname}>{data.nickname}</div>
      <div className={styles.name}>{data.name}</div>      
    </li>
  );
};

export default CharacterCard;