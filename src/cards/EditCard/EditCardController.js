
import PageContainer from '../../PageContainer';
import PropTypes from 'prop-types';
import React from 'react';
import sessionService from '../../authentication/sessionService';
import { gql } from 'apollo-boost';
import { useMutation as useMutationDefault, useQuery as useQueryDefault } from '@apollo/react-hooks';
import { Redirect as RedirectDefault } from 'react-router-dom'
import EditCardView from './EditCardView';
import ErrorMessage from '../../ErrorMessage';
import client from '../../apolloProvider/apolloClient';
import Interim from '../../Interim';

export const SAVE_CARD = gql`
  mutation upsertCard(
    $id: String
    $userId: String!
    $sideAText: String
    $sideAImageUrl: String
    $sideBText: String
    $sideBImageUrl: String
  ) {
    upsertCard(
      id: $id
      userId: $userId
      labels: []
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

export default function EditCardController({ cardId, Redirect, useMutation, useQuery }) {
  useMutation = useMutation || useMutationDefault;
  useQuery = useQuery || useQueryDefault;
  Redirect = Redirect || RedirectDefault;

  const [saveCard, saveCardState] = useMutation(SAVE_CARD, { client });
  const getCardState = useQuery(GET_CARD, { client, skip: !cardId, variables: { id: cardId } }); // { loading, error, data }
  const card = getCardState.data ? getCardState.data.me.card : undefined;

  if (saveCardState.called && !saveCardState.loading && !saveCardState.error) return <React.Fragment><Redirect to='/' /></React.Fragment>;

  function handleSave(card) {
    card.userId = sessionService.getSignInUserSession().idToken.payload.sub;
    saveCard({ variables: card });
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
        <PageContainer><EditCardView card={card} onSave={handleSave} /></PageContainer>
      }
    </React.Fragment>
  );
}

EditCardController.propTypes = {
  cardId: PropTypes.string
};
