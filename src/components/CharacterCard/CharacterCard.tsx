import React from 'react';
import CharacterCardProps from './CharacterCard.types';

const CharacterCard: React.FC<CharacterCardProps> = (props) => {
  const { data } = props;

  return (
    <div className='card-container'>Character card</div>
  );
};

export default CharacterCard;