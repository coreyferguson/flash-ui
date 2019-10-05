
import { gql } from 'apollo-boost';
import { LIST_CARDS } from '../CardList/CardListGraphqlProvider';
import { useMutation } from '@apollo/react-hooks';
import client from '../../apolloProvider/apolloClient';
import { GQL_GET_PRACTICE_DECK, cacheState as usePracticeDeckFetcherCacheState } from './usePracticeDeckFetcher';

export const SAVE_CARD = gql`
  mutation upsertCard(
    $id: String
    $userId: String!
    $labels: [String]
    $sideAText: String
    $sideAImageUrl: String
    $sideAFontSize: Int
    $sideBText: String
    $sideBImageUrl: String
    $sideBFontSize: Int
    $lastTestTime: String
  ) {
    upsertCard(
      id: $id
      userId: $userId
      labels: $labels
      sideAText: $sideAText
      sideAImageUrl: $sideAImageUrl
      sideAFontSize: $sideAFontSize
      sideBText: $sideBText
      sideBImageUrl: $sideBImageUrl
      sideBFontSize: $sideBFontSize
      lastTestTime: $lastTestTime
    ) {
      id
      labels
      sideAText
      sideAImageUrl
      sideAFontSize
      sideBText
      sideBImageUrl
      sideBFontSize
      lastTestTime
    }
  }
`;

export const GQL_SAVE_CARD = SAVE_CARD;

/**
 * @param {Boolean} isCreatingCard indicates whether current operation is creating a new card
 * @returns {Array.<{saveCard: Function, state: { loading: boolean, called: boolean, error: Error }}>}
 */
export default function useCardSaver(isCreatingCard) {
  const result = useMutation(SAVE_CARD, {
    client,
    update(cache, { data: { upsertCard } }) {
      cacheUpdater(cache, upsertCard, isCreatingCard);
    }
  });
  const saveCard = (apolloProps, extraOptions) => {
    const { optimistic } = extraOptions || {};
    if (optimistic) {
      const optimisticResponse = {
        __typename: 'Mutation',
        upsertCard: {
          __typename: 'Card',
          id: apolloProps.variables.id || new Date().toISOString(),
          labels: apolloProps.variables.labels || null,
          sideAFontSize: apolloProps.variables.sideAFontSize || null,
          sideAText: apolloProps.variables.sideAText || null,
          sideAImageUrl: apolloProps.variables.sideAImageUrl || null,
          sideBFontSize: apolloProps.variables.sideBFontSize || null,
          sideBText: apolloProps.variables.sideBText || null,
          sideBImageUrl: apolloProps.variables.sideBImageUrl || null,
          lastTestTime: apolloProps.variables.lastTestTime || null,
        }
      };
      apolloProps = Object.assign({ optimisticResponse }, apolloProps);
    }
    return result[0](apolloProps);
  };
  return [ saveCard, result[1] ];
}

export function cacheUpdater(cache, upsertCard, isCreatingCard) {
  useCardCollectionFetcherCacheUpdater(cache, upsertCard, isCreatingCard);
  usePracticeDeckFetcherCacheUpdater(cache, upsertCard);
}

export function useCardCollectionFetcherCacheUpdater(cache, upsertCard, isCreatingCard) {
  if (isCreatingCard) {
    const data = cache.readQuery({ query: LIST_CARDS });
    data.me.cards.items.unshift(upsertCard);
    cache.writeQuery({
      query: LIST_CARDS,
      data
    });
  }
}

export function usePracticeDeckFetcherCacheUpdater(cache, upsertCard) {
  if (!usePracticeDeckFetcherCacheState.hasCache) return;
  const data = cache.readQuery({ query: GQL_GET_PRACTICE_DECK });
  // when removed from practice deck
  if (!upsertCard.labels || !upsertCard.labels.includes('practice')) {
    data.me.cards.items = data.me.cards.items.filter(card => card.id!==upsertCard.id);
    cache.writeQuery({
      query: GQL_GET_PRACTICE_DECK,
      data
    });
  }
  // when lastTestTime has changed
  if (upsertCard.labels && upsertCard.labels.includes('practice')) {
    data.me.cards.items.sort((a, b) => a.lastTestTime > b.lastTestTime ? 1 : -1);
    cache.writeQuery({
      query: GQL_GET_PRACTICE_DECK,
      data
    });
  }
}
