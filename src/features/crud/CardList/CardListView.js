
import Button from '../../../context/form/Button';
import Card from '../Card';
import cardPropType from '../Card/cardPropType';
import PropTypes from 'prop-types';
import React from 'react';
import styled from './CardListStyle';
import CardListShortcuts from './CardListShortcuts';

export function CardListView({ cards, className }) {
  if (!cards) throw new Error('CardListView: invalid prop types');
  if (!cards.items) throw new Error('CardListView: invalid prop types');
  return (
    <div className={`card-list-view ${className}`}>
      <CardListShortcuts />
      <div className='actions'>
        <Button to='/cards/edit'>create card</Button>
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
