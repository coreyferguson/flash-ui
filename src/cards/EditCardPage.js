
import React from 'react';
import PageContainer from '../PageContainer';
import EditCardView from './EditCardView';

const EditCardPage = props => {
  const cardId = parseInt(props.match.params.cardId, 10);
  return <PageContainer>
    <EditCardView cardId={cardId} />
  </PageContainer>;
};

export default EditCardPage;
