import React from 'react';
import PropTypes from 'prop-types';
import CardSideView from './CardSide/CardSideView';
import { Link, useHistory } from 'react-router-dom';
import CardStyle from './CardStyle';
import Button from '@bit/overattribution.growme.button';

export default function CardView(props) {
  const history = useHistory();
  const side = props.activeSide;
  const handleEdit = e => {
    e.stopPropagation();
    history.push(`/cards/${props.item.id}/edit`);
  };
  return (
    <CardStyle onClick={() => props.onFlipCard(props.item.id)} className='no-select'>
      <div className='card-content'>
        <CardSideView
          id={props.item.id}
          image={props.image}
          imageUrl={props.item[`side${side}ImageUrl`]}
          onFetchImage={props.onFetchImage}
          side={side}
          text={props.item[`side${side}Text`]} />
      </div>
      <menu className='card-menu'>
        <Button icon='edit' onClick={handleEdit} />
        <Button icon={`flip_to_${props.activeSide === 'A' ? 'front' : 'back'}`} />
      </menu>
    </CardStyle>
  )
}

CardView.propTypes = {
  activeSide: PropTypes.string.isRequired,
  image: PropTypes.object,
  item: PropTypes.object.isRequired,
  onFetchImage: PropTypes.func.isRequired,
  onFlipCard: PropTypes.func.isRequired
};

CardView.defaultProps = {
  activeSide: 'A'
};
