
import Button from '../../Button/Button';
import Card from '../Card';
import PropTypes from 'prop-types';
import React from 'react';
import styled from './CardListStyle';
import cardPropType from '../Card/cardPropType';

export function CardListView({ cards, className }) {
  if (!cards) throw new Error('CardListView: invalid prop types');
  if (!cards.items) throw new Error('CardListView: invalid prop types');
  return (
    <div className={`card-list-view ${className}`}>
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
