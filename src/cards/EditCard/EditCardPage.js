
import React from 'react';
import PageContainer from '../../PageContainer/PageContainer';
import EditCardController from './EditCardController';

const EditCardPage = props => {
  const cardId = parseInt(props.match.params.cardId, 10);
  return <PageContainer>
    <EditCardController cardId={cardId} />
  </PageContainer>;
};

export default EditCardPage;
