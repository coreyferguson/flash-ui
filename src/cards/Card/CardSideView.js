
import config from 'config';
import PropTypes from 'prop-types';
import React from 'react';
import styled from './CardSideStyle';
import InlineLoading from '../../Loading/InlineLoadingView';

const loadingImageUrl = `${config.assets.domain}/loading.jpg`;

export function CardSideView({ text, imageUrl, image, className, side, onShowFront, onShowBack }) {
  className = className || '';

  function flipIcon() {
    if (side === 'front') {
      return <i className='material-icons flip' onClick={onShowBack}>flip_to_front</i>;
    } else {
      return <i className='material-icons flip' onClick={onShowFront}>flip_to_back</i>
    }
  }

  return (
    <div className={className}>
      {text && <span className='text'>{text}</span>}
      {(!image && imageUrl) && <InlineLoading />}
      {image && <span className='image grow' style={{ backgroundImage: `url(${image})` }}></span>}
      {flipIcon()}
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
