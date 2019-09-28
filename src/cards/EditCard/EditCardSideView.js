
import './EditCardSideView.scss';
import InlineLoading from '../../Loading/InlineLoadingView';
import mediaService from '../../media/mediaService';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function EditCardSideView(props) {
  const textRef = useRef();

  const [ loading, setLoading ] = useState(false);
  const [ image, setImage ] = useState();
  const [ text, setText ] = useState();
  const [ imageUrl, setImageUrl ] = useState();

  // focus textarea
  useEffect(() => props.focus && textRef.current.focus());

  // undefined = not specified
  // null = explicitly removed
  if (image === undefined && props.image) setImage(props.image);
  if (text === undefined && props.text) setText(props.text);
  if (!imageUrl && props.imageUrl) setImageUrl(props.imageUrl);

  const handleTextChange = e => {
    setText(e.target.value);
    handleChange({ text: e.target.value });
  };

  const handleChange = (values) => {
    values = Object.assign({ text, imageUrl }, values);
    if (props.onChange) props.onChange(values);
  };

  const viewFileUploadInput = () => !image && <input type="file" onChange={uploadFile} className='mousetrap' />;

  const viewFileUploadImage = () => {
    if (!image) return;
    return (
      <div className='attachment'>
        <img src={image} />
        <button onClick={handleDelete} className='icon'>
          <i className='material-icons delete'>delete</i>
        </button>
      </div>
    );
  };

  const uploadFile = async e => {
    // get the file to be uploaded
    if (!e.target.files[0]) return;
    setLoading(true);
    const file = e.target.files[0];

    // show image immediately in current view
    const reader = new FileReader();
    reader.onload = e => setImage(e.target.result);
    reader.readAsDataURL(file);

    // save the image
    const newImageUrl = await mediaService.upload(file);
    setImageUrl(newImageUrl);
    setLoading(false);
    handleChange({ imageUrl: newImageUrl });
  };

  const handleDelete = e => {
    e.preventDefault();
    setImage(null);
    setLoading(false);
    setImageUrl(null);
    handleChange({ imageUrl: null });
  };

  return (
    <div className='edit-card-side-view'>
      <h2>side {props.sideName}</h2>
      <TextareaAutosize
        inputRef={textRef}
        placeholder='flashcard text'
        maxRows={20}
        value={text}
        onChange={handleTextChange}
        className='mousetrap' />
      <div className='media'>
        {viewFileUploadInput()}
        {viewFileUploadImage()}
        {loading && <InlineLoading />}
      </div>
    </div>
  );
}

EditCardSideView.propTypes = {
  sideName: PropTypes.string.isRequired,
  text: PropTypes.string,
  imageUrl: PropTypes.string,
  onChange: PropTypes.func,
  focus: PropTypes.bool
};
