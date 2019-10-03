
import { Link } from 'react-router-dom';
import DomPurify from 'dompurify';
import InlineLoading from '../../Loading/InlineLoadingView';
import marked from 'marked';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import styled from './CardSideStyle';

export function CardSideView({ id, text, imageUrl, image, className, side, onShowFront, onShowBack }) {
  className = className || '';

  const [ markdown, setMarkdown ] = useState();
  const [ fontSize, setFontSize ] = useState('100%');
  useMemo(() => {
    if (text) {
      setMarkdown(DomPurify.sanitize(marked(text, { breaks: true })));
      // a terrible auto font-sizing solution... it kinda works :)
      let fontSize = '100%';
      let curWidth = 0;
      let maxWidth = 0;
      let maxHeight = 0;
      for (let char of text) {
        if (char === '\n') {
          curWidth = 0;
          maxHeight++;
        } else {
          curWidth++;
          maxWidth = Math.max(maxWidth, curWidth);
        }
      }
      if (maxWidth <= 30 && maxHeight <= 9) fontSize = '100%';
      else if (maxWidth <= 40 && maxHeight <= 11) fontSize = '80%';
      else fontSize = '60%';
      console.log('here', text, fontSize);
      setFontSize(fontSize);
    } else {
      setMarkdown();
    }
  }, [text]);

  function flip() {
    if (side === 'front') onShowBack();
    else onShowFront();
  }

  return (
    <div className={className} onClick={flip}>
      {markdown && <span className='text' dangerouslySetInnerHTML={{__html: markdown}} style={{ fontSize }}/>}
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
