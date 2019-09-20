
import './EditCardView.scss';
import CardSideView from './CardSideView';
import EditCardSideView from './EditCardSideView';
import PageContainer from '../PageContainer';
import PropTypes from 'prop-types';
import React from 'react';
import sessionService from '../authentication/sessionService';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom'


const SAVE_CARD = gql`
  mutation UpsertCard(
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

export default function EditCardView(props) {
  const [saveCard, { loading, called, error }] = useMutation(SAVE_CARD);

  if (error) throw new Error('Unknown error occurred. Unable to save card. ' + error.message);
  if (called && !loading) return <Redirect to='/' />

  const session = sessionService.getSignInUserSession();
  const card = {
    userId: session.idToken.payload.sub
  };

  function handleEditCardSideViewChange(sideLabel, side) {
    card[`side${sideLabel}Text`] = side.text;
    card[`side${sideLabel}ImageUrl`] = side.image;
  }

  function handleSubmit(e) {
    e.preventDefault();
    saveCard({ variables: card });
  }

  const cardId = props.cardId;
  return (
    <form className='edit-card' onSubmit={handleSubmit}>
      {!!cardId && <h1>edit card</h1>}
      {!cardId && <h1>create a card</h1>}
      <div className='sides'>
        <div className='side'><EditCardSideView sideName='1' onChange={card => handleEditCardSideViewChange('A', card)} /></div>
        <div className='side'><EditCardSideView sideName='2' onChange={card => handleEditCardSideViewChange('B', card)} /></div>
      </div>
      <div className='save'>
        <button type='submit' className='button'>save</button>
      </div>
      {loading && <p>loading</p>}
    </form>
  );
}

EditCardView.propTypes = {
  cardId: PropTypes.number
};
