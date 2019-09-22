
import Button from '../../Button/Button';
import CardView from '../CardView';
import PropTypes from 'prop-types';
import React from 'react';

export default function CardListView({ cards }) {
  if (!cards) throw new Error('CardListView: invalid prop types');
  if (!cards.items) throw new Error('CardListView: invalid prop types');
  return (
    <div className='card-list-view'>
      <div className='actions'>
        <Button to='/cards/edit'>create card</Button>
      </div>
      <div className='list'>
        {cards.items.map(card => <CardView key={card.id} card={card} />)}
      </div>
    </div>
  )
}

CardListView.propTypes = {
  cards: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      sideAText: PropTypes.string,
      sideAImageUrl: PropTypes.string,
      sideBText: PropTypes.string,
      sideBImageUrl: PropTypes.string
    })).isRequired
  }).isRequired
};
