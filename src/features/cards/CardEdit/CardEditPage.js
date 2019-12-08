import React from 'react';
import Navigation from '../../../context/Navigation';
import CardEditView from './index';

export default function CardEditPage(props) {
  const cardId = props.match.params.cardId;
  return (
    <React.Fragment>
      <Navigation />
      <CardEditView id={cardId} />
    </React.Fragment>
  );
}