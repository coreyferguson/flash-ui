import React from 'react';
import PropTypes from 'prop-types';
import CardSideView from './CardSide/CardSideView';
import { Link } from 'react-router-dom';
import CardStyle from './CardStyle';

export default function CardView(props) {
  const side = props.activeSide;
  return (
    <CardStyle onClick={() => props.onFlipCard(props.item.id)}>
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
        <Link to={`/cards/${props.item.id}/edit`} onClick={e => e.stopPropagation() }>
          <i className='material-icons'>edit</i>
        </Link>
        <i className='material-icons action flip'>{`flip_to_${props.activeSide === 'A' ? 'front' : 'back'}`}</i>
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
