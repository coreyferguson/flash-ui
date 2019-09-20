
import './cardView.scss';
import React, { useState } from 'react';
import mediaService from '../media/mediaService';
import './CardListView.scss';

export default function CardView({ card }) {
  const [ image, setImage ] = useState();
  let shouldFetch = true;
  if (!image && card.sideAImageUrl && shouldFetch) mediaService.getUrl(card.sideAImageUrl).then(setImage);
  const cardItems = [];
  if (card.sideAText) cardItems.push(<span className='text' key='1'>{card.sideAText}</span>);
  if (image) cardItems.push(<span className='image grow' style={{ backgroundImage: `url(${image})` }} key='2'> &nbsp; </span>);
  return (
    <div className='card-view'>
      {cardItems}
    </div>
  );
}
