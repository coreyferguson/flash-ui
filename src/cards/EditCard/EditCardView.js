
import cardPropType from '../Card/cardPropType';
import EditCardSideView from './EditCardSideView';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from './EditCardStyle';
import mediaService from '../../media/mediaService';

export function EditCardView({ className, card, onSave, onCancel, onDelete }) {
  if (!onSave) throw new Error('EditCardView: missing required property `onSave`');

  const [ images, setImages ] = useState({});
  if (!images.sideA && card && card.sideAImageUrl) mediaService.getUrl(card.sideAImageUrl).then(image => {
    setImages(Object.assign({}, images, { sideA: image }));
  });
  if (!images.sideB && card && card.sideBImageUrl) mediaService.getUrl(card.sideBImageUrl).then(image => {
    setImages(Object.assign({}, images, { sideB: image }));
  });

  card = Object.assign({}, card);
  className = className || '';
  const isUpdatingCard = !!card.id;

  function reset() {
    setImages({});
  }

  function handleEditCardSideViewChange(sideLabel, side) {
    card[`side${sideLabel}Text`] = side.text;
    card[`side${sideLabel}ImageUrl`] = side.imageUrl;
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(card);
  }

  function handleCancel(e) {
    e.preventDefault();
    onCancel();
  }

  function handleDelete(e) {
    e.preventDefault();
    onDelete(card);
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      {!!card.id && <h1>edit card</h1>}
      {!card.id && <h1>create a card</h1>}
      <div className='sides'>
        <div className='side'>
          <EditCardSideView
            sideName='1'
            text={card.sideAText}
            imageUrl={card.sideAImageUrl}
            image={images.sideA}
            onChange={side => handleEditCardSideViewChange('A', side)} />
        </div>
        <div className='side'>
          <EditCardSideView
            sideName='2'
            text={card.sideBText}
            imageUrl={card.sideBImageUrl}
            image={images.sideB}
            onChange={side => handleEditCardSideViewChange('B', side)} />
        </div>
      </div>
      <div className='save'>
        <button onClick={handleCancel}>cancel</button>
        {isUpdatingCard && <button onClick={handleDelete}>delete</button>}
        <button type='submit' className='primary'>save</button>
      </div>
    </form>
  );
}

EditCardView.propTypes = {
  card: cardPropType,
  onSave: PropTypes.func.isRequired
};

export default styled(EditCardView);
