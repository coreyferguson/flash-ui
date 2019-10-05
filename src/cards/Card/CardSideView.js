
import { Link } from 'react-router-dom';
import DomPurify from 'dompurify';
import InlineLoading from '../../Loading/InlineLoadingView';
import marked from 'marked';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from './CardSideStyle';
import { autoSizeText } from '../graphql/fontResizeClient';

export function CardSideView({ id, text, imageUrl, image, fontSize, className, side, onShowFront, onShowBack }) {
  className = className || '';

  const thisElement = useRef();
  const [ markdown, setMarkdown ] = useState();
  useMemo(() => {
    if (text) {
      setMarkdown(DomPurify.sanitize(marked(text, { breaks: true })));
    } else {
      setMarkdown();
    }
  }, [text]);

  useEffect(() => {
    autoSizeText(id, side, thisElement.current, !!imageUrl, fontSize);
  }, [ markdown ]);

  function flip() {
    if (side === 'front') onShowBack();
    else onShowFront();
  }

  return (
    <div className={className} onClick={flip} ref={thisElement}>
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
  fontSize: PropTypes.number,
  className: PropTypes.string,
  side: PropTypes.string.isRequired,
  onShowFront: PropTypes.func.isRequired,
  onShowBack: PropTypes.func.isRequired
};
