
import mediaService from '../../media/mediaService';
import React, { useState } from 'react';
import cardPropType from './cardPropType';
import CardSideView from './CardSideView';

export default function CardController({ card }) {
  const [ side, setSide ] = useState('front');
  const [ images, setImages ] = useState({});

  const sideKey = side === 'front' ? 'sideA' : 'sideB';
  if (!images[sideKey] && card[`${sideKey}ImageUrl`]) {
    mediaService.getUrl(card[`${sideKey}ImageUrl`]).then(image => {
      setImages(Object.assign({}, images, { [sideKey]: image }));
    });
  }

  return (
    <CardSideView
      id={card.id}
      text={card[`${sideKey}Text`]}
      imageUrl={card[`${sideKey}ImageUrl`]}
      fontSize={card[`${sideKey}FontSize`]}
      image={images[sideKey]}
      side={side}
      onShowFront={() => setSide('front')}
      onShowBack={() => setSide('back')} />
  );
}

CardController.propTypes = {
  card: cardPropType.isRequired
};
