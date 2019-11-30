
import { default as useCardSaverDefault } from '../../crud/graphql/useCardSaver';
import { useMutation as useMutationDefault, useQuery as useQueryDefault } from '@apollo/react-hooks';
import ErrorMessage, { UnknownError } from '../../../context/error/ErrorMessage';
import Loading from '../../../context/Loading';
import PracticeView from './PracticeView';
import PropTypes from 'prop-types';
import React, { useState as useStateDefault } from 'react';
import usePracticeDeckFetcher from '../../crud/graphql/usePracticeDeckFetcher';
import usePracticeDeckCreator from '../../crud/graphql/usePracticeDeckCreator';

export const ViewState = {
  DEFAULT: "Default view state when fetching for first time or after creation of a new deck",
  LOADING: "Loading state override for when Apollo can't provide it",
  REFETCH_PRACTICE_CARDS_STILL_NO_CARDS: "No cards in practice deck even after attempting to create",
  REFETCH_PRACTICE_CARDS_UNKNOWN_ERROR: "Refetch practice deck unknown error"
}

export default function PracticeController({ useMutation, useQuery, useState, useCardSaver }) {
  // allow overrides for testing
  useMutation = useMutation || useMutationDefault;
  useQuery = useQuery || useQueryDefault;
  useState = useState || useStateDefault;
  useCardSaver = useCardSaver || useCardSaverDefault;

  // hooks
  const getPracticeCardsState = usePracticeDeckFetcher();
  const [ newPracticeDeck, newPracticeDeckState ] = usePracticeDeckCreator();
  const [ viewState, setViewState ] = useState(ViewState.DEFAULT);
  const [ saveCard ] = useCardSaver(false);

  // all loading states
  const loading =
    getPracticeCardsState.loading ||
    newPracticeDeckState.loading ||
    viewState === ViewState.LOADING;
  if (loading) return <Loading />;

  // all unknown errors
  const inError = !!getPracticeCardsState.error ||
    viewState === ViewState.REFETCH_PRACTICE_CARDS_UNKNOWN_ERROR;
  if (inError) return <UnknownError />;

  if (viewState === ViewState.REFETCH_PRACTICE_CARDS_STILL_NO_CARDS) {
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

  // data from backend
  const userId = getPracticeCardsState.data.me.sub;
  const cards = getPracticeCardsState.data.me.cards;

  // fetched practice deck but there are no cards; create them now
  if (cards.items.length === 0) {
    setTimeout(() => { // indexes may take a little bit to update since last card save
      newPracticeDeck({ variables: { userId } }).then(res => {
        if (res.data.newPracticeDeck.items.length === 0) setViewState(ViewState.REFETCH_PRACTICE_CARDS_STILL_NO_CARDS);
        else setViewState(ViewState.DEFAULT);
      }).catch(err => {
        setViewState(ViewState.REFETCH_PRACTICE_CARDS_UNKNOWN_ERROR);
      });
    }, 50);
    return <Loading />;
  }

  const handleRemindImmediately = () => {
    const card = Object.assign({}, cards.items[0], { userId, lastTestTime: new Date().toISOString() });
    saveCard({ variables: card }, { optimistic: true });
  };
  const handleRemindOften = () => {
    let labels = cards.items[0].labels;
    labels = labels.filter(label =>
      label!=='frequency-sometimes' &&
      label!=='frequency-often' &&
      label!=='practice');
    labels.push('frequency-often');
    const card = Object.assign({}, cards.items[0], { userId, labels, lastTestTime: new Date().toISOString() });
    saveCard({ variables: card }, { optimistic: true });
  };
  const handleRemindSometimes = () => {
    let labels = cards.items[0].labels;
    labels = labels.filter(label =>
      label!=='frequency-sometimes' &&
      label!=='frequency-often' &&
      label!=='practice');
    labels.push('frequency-sometimes');
    const card = Object.assign({}, cards.items[0], { userId, labels, lastTestTime: new Date().toISOString() });
    saveCard({ variables: card }, { optimistic: true });
  };
  const handleRemindNever = () => {
    let labels = cards.items[0].labels;
    labels = labels.filter(label =>
      label!=='frequency-sometimes' &&
      label!=='frequency-often' &&
      label!=='practice');
    const card = Object.assign({}, cards.items[0], { userId, labels, lastTestTime: new Date().toISOString() });
    saveCard({ variables: card }, { optimistic: true });
  };

  return <PracticeView
      key={cards.items[0].id}
      canHandleImmediately={cards.items.length > 1}
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
