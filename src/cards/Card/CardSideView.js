
import config from 'config';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import styled from './CardSideStyle';
import InlineLoading from '../../Loading/InlineLoadingView';
import { Link } from 'react-router-dom';
import marked from 'marked';
import DomPurify from 'dompurify';

const loadingImageUrl = `${config.assets.domain}/loading.jpg`;

export function CardSideView({ id, text, imageUrl, image, className, side, onShowFront, onShowBack }) {
  className = className || '';

  let markdown;
  useMemo(() => {
    if (text) {
      markdown = DomPurify.sanitize(marked(text));
    }
  }, [text])

  function flip() {
    if (side === 'front') onShowBack();
    else onShowFront();
  }

  return (
    <div className={className} onClick={flip}>
      {markdown && <span className='text' dangerouslySetInnerHTML={{__html: markdown}} />}
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
