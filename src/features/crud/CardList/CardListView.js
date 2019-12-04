
import Button from '@bit/overattribution.growme.button';
import Card from '../Card';
import cardPropType from '../Card/cardPropType';
import PropTypes from 'prop-types';
import React from 'react';
import styled from './CardListStyle';
import CardListShortcuts from './CardListShortcuts';
import { Link } from 'react-router-dom';

export function CardListView({ cards, className }) {
  if (!cards) throw new Error('CardListView: invalid prop types');
  if (!cards.items) throw new Error('CardListView: invalid prop types');
  return (
    <div className={`card-list-view ${className}`}>
      <CardListShortcuts />
      <div className='actions'>
        <Button component={<Link to='/cards/edit'>create card</Link>} />
      </div>
      <div className='list'>
        {cards.items.map(card => <Card key={card.id} card={card} />)}
      </div>
    </div>
  )
}

export default styled(CardListView);

CardListView.propTypes = {
  cards: PropTypes.shape({
    items: PropTypes.arrayOf(cardPropType).isRequired
  }).isRequired
};
