
import config from 'config';
import PropTypes from 'prop-types';
import React from 'react';
import styled from './CardSideStyle';
import InlineLoading from '../../Loading/InlineLoadingView';
import { Link } from 'react-router-dom';

const loadingImageUrl = `${config.assets.domain}/loading.jpg`;

export function CardSideView({ id, text, imageUrl, image, className, side, onShowFront, onShowBack }) {
  className = className || '';

  function flip() {
    if (side === 'front') onShowBack();
    else onShowFront();
  }

  return (
    <div className={className} onClick={flip}>
      {text && <span className='text'>{text}</span>}
      {(!image && imageUrl) && <InlineLoading />}
      {image && <span className='image grow' style={{ backgroundImage: `url(${image})` }}></span>}
      <div className='actions'>
        <Link to={`/cards/${id}/edit`} className='action'><i className='material-icons'>edit</i></Link>
        <i className='material-icons action flip'>{`flip_to_${side}`}</i>
      </div>
    </div>
  );
}

export default styled(CardSideView);

CardSideView.propTypes = {
  text: PropTypes.string,
  imageUrl: PropTypes.string,
  image: PropTypes.string,
  className: PropTypes.string,
  side: PropTypes.string.isRequired,
  onShowFront: PropTypes.func.isRequired,
  onShowBack: PropTypes.func.isRequired
};
