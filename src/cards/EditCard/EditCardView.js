
import { HotkeyShortcut } from '../../Shortcuts';
import EditCardSideView from './EditCardSideView';
import PropTypes from 'prop-types';
import React from 'react';
import styled from './EditCardStyle';

export function EditCardView(props) {
  const {
    className='',
    isUpdating,
    labels,
    onLabelsChange,
    onSave,
    onSideATextChange,
    onSideAImageChange,
    onSideBTextChange,
    onSideBImageChange,
    onCancel,
    onDelete,
    sideAText,
    sideAImage,
    sideAImageLoading,
    sideBText,
    sideBImage,
    sideBImageLoading
  } = props;

  const handleCancel = e => {
    if (e) e.preventDefault();
    onCancel();
  }

  const handleDelete = e => {
    if (e) e.preventDefault();
    onDelete();
  }

  const handleSave = e => {
    if (e) e.preventDefault();
    onSave();
  }

  const labelsToString = (labels) => labels ? labels.join(' ') : '';
  const labelsToArray = (labels) => labels.split(' ');
  const handleLabelsChange = e => onLabelsChange(labelsToArray(e.target.value));

  return (
    <form className={className} onSubmit={handleSave}>

      <HotkeyShortcut combination={'escape'} callback={handleCancel} />
      <HotkeyShortcut combination={'ctrl+enter'} callback={handleSave} />

      {isUpdating && <h1>edit card</h1>}
      {!isUpdating && <h1>create a card</h1>}
      <div className='sides'>
        <div className='side'>
          <EditCardSideView
            focusOnMount={true}
            image={sideAImage}
            imageLoading={sideAImageLoading}
            onImageChange={onSideAImageChange}
            onTextChange={onSideATextChange}
            sideName='1'
            text={sideAText} />

        </div>
        <div className='side'>
          <EditCardSideView
            image={sideBImage}
            imageLoading={sideBImageLoading}
            onImageChange={onSideBImageChange}
            onTextChange={onSideBTextChange}
            sideName='2'
            text={sideBText} />
        </div>
      </div>
      <div className='labels'>
        <span>labels</span>
        <input type='text' onChange={handleLabelsChange} value={labelsToString(labels)} className='mousetrap' />
      </div>
      <div className='save'>
        <button onClick={handleCancel}>cancel</button>
        {isUpdating && <button onClick={handleDelete}>delete</button>}
        <button type='submit' className='primary'>save</button>
      </div>
    </form>
  );
}

EditCardView.propTypes = {
  isUpdating: PropTypes.bool,
  labels: PropTypes.array,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLabelsChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSideAImageChange: PropTypes.func.isRequired,
  onSideATextChange: PropTypes.func.isRequired,
  onSideBImageChange: PropTypes.func.isRequired,
  onSideBTextChange: PropTypes.func.isRequired,
  sideAImage: PropTypes.string,
  sideAImageLoading: PropTypes.bool,
  sideAText: PropTypes.string,
  sideBImage: PropTypes.string,
  sideBImageLoading: PropTypes.bool,
  sideBText: PropTypes.string,
};

export default styled(EditCardView);
