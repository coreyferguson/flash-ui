
import CardView from './CardView';
import mediaService from '../../media/mediaService';
import React, { useState } from 'react';
import cardPropType from './cardPropType';

export default function CardController({ card }) {
  const [ image, setImage ] = useState();
  if (!image && card.sideAImageUrl) mediaService.getUrl(card.sideAImageUrl).then(setImage);
  return <CardView card={card} image={image} />;
}

CardController.propTypes = {
  card: cardPropType.isRequired
};
