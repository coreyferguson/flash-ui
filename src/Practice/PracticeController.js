
import { gql } from 'apollo-boost';
import {
  useMutation as useMutationDefault,
  useQuery as useQueryDefault
} from '@apollo/react-hooks';
import ErrorMessage, { UnknownError } from '../ErrorMessage';
import client from '../apolloProvider/apolloClient';
import Loading from '../Loading';
import PracticeView from './PracticeView';
import PropTypes from 'prop-types';
import React, { useState as useStateDefault } from 'react';

export const GQL_GET_PRACTICE_CARDS = gql`
  query getPracticeCards {
    me {
      sub
      cards(label: "practice", orderBy: "lastTestTime") {
        items {
          id
          labels
          sideAText
          sideAImageUrl
          sideBText
          sideBImageUrl
        }
      }
    }
  }
`;

export const GQL_NEW_PRACTICE_DECK = gql`
  mutation newPracticeDeck($userId: String!) {
    newPracticeDeck(userId: $userId, pageSize: 2)
  }
`;

export const ViewState = {
  FETCH_PRACTICE_CARDS: "Fetching practice cards from backend server",
  NEW_PRACTICE_DECK: "Creating a new practice deck because the current one is empty",
  REFETCH_PRACTICE_CARDS_LOADING: "Fetch practice deck again because new deck created",
  REFETCH_PRACTICE_CARDS_COMPLETE: "Refetch practice deck complete; cards should be available now",
  REFETCH_PRACTICE_CARDS_ERROR: "Refetch practice deck unknown error"
}

export default function PracticeController({ useMutation, useQuery, useState }) {
  // allow overrides for testing
  useMutation = useMutation || useMutationDefault;
  useQuery = useQuery || useQueryDefault;
  useState = useState || useStateDefault;

  // hooks
  const getPracticeCardsState = useQuery(GQL_GET_PRACTICE_CARDS, { client });
  const [ newPracticeDeck, newPracticeDeckState ] = useMutation(GQL_NEW_PRACTICE_DECK, { client });
  const [ viewState, setViewState ] = useState(ViewState.FETCH_PRACTICE_CARDS);

  // all loading states
  const loading =
    getPracticeCardsState.loading ||
    newPracticeDeckState.loading ||
    viewState === ViewState.REFETCH_PRACTICE_CARDS_LOADING;
  if (loading) return <Loading />;

  // all errors
  const inError = !!getPracticeCardsState.error ||
    viewState === ViewState.REFETCH_PRACTICE_CARDS_ERROR;
  if (inError) return <UnknownError />;

  // data from backend
  const userId = getPracticeCardsState.data.me.sub;
  const cards = getPracticeCardsState.data.me.cards;

  // fetched practice deck but there are no cards; create them now
  if (viewState === ViewState.FETCH_PRACTICE_CARDS && cards.items.length === 0) {
    newPracticeDeck({ variables: { userId } });
    setViewState(ViewState.NEW_PRACTICE_DECK);
    return <Loading />;
  }

  // cards have been created; refetch cards from backend
  if (viewState === ViewState.NEW_PRACTICE_DECK) {
    setViewState(ViewState.REFETCH_PRACTICE_CARDS_LOADING);
    getPracticeCardsState.refetch().then(() => {
      setViewState(ViewState.REFETCH_PRACTICE_CARDS_COMPLETE);
    }).catch(err => {
      setViewState(ViewState.REFETCH_PRACTICE_CARDS_ERROR);
    });
    return <Loading />;
  }

  // refetch completed; still no cards
  if (viewState === ViewState.REFETCH_PRACTICE_CARDS_COMPLETE && cards.items.length === 0) {
    // TODO: Need a better message here
    return (
      <ErrorMessage>
        <h2>practice deck could not be created</h2>
        <p>This may because you have chosen to "never" be reminded on all your cards.</p>
        <p>Set frequency labels on those cards you'd like to practice again.</p>
        <div>
          <div>frequency labels</div>
          <ul>
            <li><code>frequency-often</code></li>
            <li><code>frequency-sometimes</code></li>
          </ul>
        </div>
      </ErrorMessage>
    );
  }

  const handleRemindImmediately = () => {};
  const handleRemindOften = () => {};
  const handleRemindSometimes = () => {};
  const handleRemindNever = () => {};

  return <PracticeView
      card={cards.items[0]}
      onRemindImmediately={handleRemindImmediately}
      onRemindOften={handleRemindOften}
      onRemindSometimes={handleRemindSometimes}
      onRemindNever={handleRemindNever} />;
}

PracticeController.propTypes = {
  useMutation: PropTypes.func,
  useQuery: PropTypes.func,
  useState: PropTypes.func
}
