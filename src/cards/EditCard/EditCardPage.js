
import React from 'react';
import EditCardController from './EditCardController';

const EditCardPage = props => {
  const cardId = parseInt(props.match.params.cardId, 10);
  return <EditCardController cardId={cardId} />;
};

export default EditCardPage;
