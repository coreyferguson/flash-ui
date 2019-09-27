
import PageContainer from '../../PageContainer';
import PropTypes from 'prop-types';
import React from 'react';
import sessionService from '../../authentication/sessionService';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Redirect as RedirectDefault } from 'react-router-dom'
import EditCardView from './EditCardView';
import ErrorMessage from '../../ErrorMessage';
import client from '../../apolloProvider/apolloClient';

export const SAVE_CARD = gql`
  mutation upsertCard(
    $userId: String!
    $sideAText: String
    $sideAImageUrl: String
    $sideBText: String
    $sideBImageUrl: String
  ) {
    upsertCard(
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

const Loading = () => <p>Loading...</p>;

export default function EditCardController({ Redirect }) {
  const [saveCard, { loading, called, error }] = useMutation(SAVE_CARD, { client });
  Redirect = Redirect || RedirectDefault;

  if (called && !loading && !error) return <Redirect to='/' />;

  function handleSave(card) {
    card.userId = sessionService.getSignInUserSession().idToken.payload.sub;
    saveCard({ variables: card });
  }

  return (
    <React.Fragment>
      {error && <ErrorMessage>
        <h2>Unknown error when saving card. Please try again.</h2>
        <h3>{error.message}</h3>
      </ErrorMessage> }
      { loading && <Loading />}
      <EditCardView onSave={handleSave} />
    </React.Fragment>
  );
}

EditCardView.propTypes = {
  cardId: PropTypes.number
};
