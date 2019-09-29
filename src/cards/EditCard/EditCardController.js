
import PageContainer from '../../PageContainer';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import sessionService from '../../authentication/sessionService';
import { gql } from 'apollo-boost';
import { useMutation as useMutationDefault, useQuery as useQueryDefault } from '@apollo/react-hooks';
import EditCardView from './EditCardView';
import ErrorMessage from '../../ErrorMessage';
import client from '../../apolloProvider/apolloClient';
import Interim from '../../Interim';
import { LIST_CARDS } from '../CardList/CardListGraphqlProvider';

export const SAVE_CARD = gql`
  mutation upsertCard(
    $id: String
    $userId: String!
    $labels: [String]
    $sideAText: String
    $sideAImageUrl: String
    $sideBText: String
    $sideBImageUrl: String
  ) {
    upsertCard(
      id: $id
      userId: $userId
      labels: $labels
      sideAText: $sideAText
      sideAImageUrl: $sideAImageUrl
      sideBText: $sideBText
      sideBImageUrl: $sideBImageUrl
    ) {
      id
      labels
      sideAText
      sideAImageUrl
      sideBText
      sideBImageUrl
    }
  }
`;

export const GET_CARD = gql`
  query getCard($id: String!) {
    me {
      card(id: $id) {
        id
        labels
        sideAText
        sideAImageUrl
        sideBText
        sideBImageUrl
      }
    }
  }
`;

export const DELETE_CARD = gql`
  mutation deleteCard($userId: String!, $id: String!) {
    deleteCard(
      userId: $userId,
      id: $id
    ) {
      id
    }
  }
`;

export default function EditCardController({ cardId, redirectAfterSave, useMutation, useQuery }) {
  useMutation = useMutation || useMutationDefault;
  useQuery = useQuery || useQueryDefault;
  redirectAfterSave = redirectAfterSave || (() => window.history.back())

  const isUpdatingCard = !!cardId;
  const isCreatingCard = !cardId;

  // save card
  const [ saveCard, saveCardState ] = useMutation(SAVE_CARD, {
    client,
    update(cache, { data: { upsertCard } }) {
      if (isCreatingCard) {
        const data = cache.readQuery({ query: LIST_CARDS });
        data.me.cards.items.unshift(upsertCard);
        cache.writeQuery({
          query: LIST_CARDS,
          data
        });
      }
    }
  });

  // get card
  const getCardState = useQuery(GET_CARD, { client, skip: isCreatingCard, variables: { id: cardId } });
  const card = getCardState.data ? getCardState.data.me.card : undefined;

  // delete card
  const [ deleteCard, deleteCardState ] = useMutation(DELETE_CARD, {
    client,
    update(cache, { data: { deleteCard } }) {
      const data = cache.readQuery({ query: LIST_CARDS });
      data.me.cards.items = data.me.cards.items.filter(card => card.id !== deleteCard.id);
      cache.writeQuery({
        query: LIST_CARDS,
        data
      });
    }
  });

  // redirect after successful save or delete
  const finishedSaving = saveCardState.called && !saveCardState.loading && !saveCardState.error;
  const finishedDelete = deleteCardState.called && !deleteCardState.loading && !deleteCardState.error;
  if (finishedSaving || finishedDelete) {
    redirectAfterSave();
    return <Interim />;
  }

  function handleSave(card) {
    card.userId = sessionService.getSignInUserSession().idToken.payload.sub;
    saveCard({ variables: card });
  }

  function handleCancel() {
    redirectAfterSave();
  }

  function handleDelete(card) {
    if (window.confirm('This operation cannot be undone. Are you sure you want to delete?')) {
      card.userId = sessionService.getSignInUserSession().idToken.payload.sub;
      deleteCard({ variables: card });
    }
  }

  return (
    <React.Fragment>
      {saveCardState.error && <ErrorMessage>
        <h2>Unknown error when saving card. Please try again.</h2>
        <h3>{saveCardState.error.message}</h3>
      </ErrorMessage> }
      {getCardState.error && <ErrorMessage>
        <h2>Unknown error when saving card. Please try again.</h2>
        <h3>{getCardState.error.message}</h3>
      </ErrorMessage> }
      { saveCardState.loading && <Interim />}
      { getCardState.loading && <Interim />}
      {
        !saveCardState.loading && !getCardState.loading &&
        <PageContainer>
          <EditCardView
            card={card}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete} />
        </PageContainer>
      }
    </React.Fragment>
  );
}

EditCardController.propTypes = {
  cardId: PropTypes.string,
  redirectAfterSave: PropTypes.func
};
