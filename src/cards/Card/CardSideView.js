
import config from 'config';
import PropTypes from 'prop-types';
import React from 'react';
import styled from './CardSideStyle';
import InlineLoading from '../../Loading/InlineLoadingView';

const loadingImageUrl = `${config.assets.domain}/loading.jpg`;

export function CardSideView({ text, imageUrl, image, className }) {
  className = className || '';
  return (
    <div className={className}>
      {text && <span className='text'>{text}</span>}
      {(!image && imageUrl) && <InlineLoading />}
      {image && <span className='image grow' style={{ backgroundImage: `url(${image})` }}></span>}
    </div>
  );
}

export default styled(CardSideView);

CardSideView.propTypes = {
  text: PropTypes.string,
  imageUrl: PropTypes.string,
  image: PropTypes.string,
  className: PropTypes.string
};
