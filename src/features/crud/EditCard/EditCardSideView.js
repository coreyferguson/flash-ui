
import './EditCardSideView.scss';
import InlineLoading from '@bit/overattribution.growme.loading-inline';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function EditCardSideView(props) {
  const { focusOnMount, image, imageLoading, inputRef, onImageChange, onTextChange, sideName, text } = props;
  const textRef = useRef();

  // focus textarea
  useEffect(() => {
    if (focusOnMount) {
      textRef.current.focus();
    }
  }, [focusOnMount]);

  const handleImageChange = e => {
    e.preventDefault();
    onImageChange(e.target.files && e.target.files[0]);
  };

  const viewFileUploadInput = () => {
    if (image) return;
    return (
      <input
        type="file"
        onChange={handleImageChange}
        className='mousetrap' />
    );
  };

  const viewFileUploadImage = () => {
    if (!image) return;
    return (
      <div className='attachment'>
        <img src={image} />
        <button onClick={handleImageChange} className='icon'>
          <i className='material-icons delete'>delete</i>
        </button>
      </div>
    );
  };

  return (
    <div className='edit-card-side-view'>
      <h2>side {sideName}</h2>
      <TextareaAutosize
        inputRef={textRef}
        placeholder='flashcard text'
        maxRows={20}
        value={text || ''}
        onChange={e => onTextChange(e.target.value)}
        className='mousetrap' />
      <div className='media'>
        {viewFileUploadInput()}
        {viewFileUploadImage()}
        {imageLoading && <InlineLoading />}
      </div>
    </div>
  );
}

EditCardSideView.propTypes = {
  focusOnMount: PropTypes.bool,
  image: PropTypes.string,
  imageLoading: PropTypes.bool,
  onImageChange: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  sideName: PropTypes.string.isRequired,
  text: PropTypes.string
};
