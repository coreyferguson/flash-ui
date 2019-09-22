
import React from 'react';
import SideView from './CardSideView';
import PropTypes from 'prop-types';
import cardPropType from './cardPropType';

export default function CardView({ card, image }) {
  if (!card) throw new Error('CardView: invalid prop types');
  return <SideView text={card.sideAText} imageUrl={card.sideAImageUrl} image={image} />;
}

CardView.propTypes = {
  card: cardPropType.isRequired,
  image: PropTypes.string
};
