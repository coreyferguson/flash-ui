
import React from 'react';
import EditCardController from './EditCardController';

const EditCardPage = props => {
  const cardId = props.match.params.cardId;
  return <EditCardController cardId={cardId} />;
};

export default EditCardPage;
