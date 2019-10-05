
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import client from '../../apolloProvider/apolloClient';
import { GQL_GET_PRACTICE_DECK, cacheState as usePracticeDeckFetcherCacheState } from './usePracticeDeckFetcher';
import { LIST_CARDS, useQueryCacheState } from '../CardList/CardListGraphqlProvider';

export const GQL_NEW_PRACTICE_DECK = gql`
  mutation newPracticeDeck($userId: String!) {
    newPracticeDeck(userId: $userId, pageSize: 10) {
      items {
        id
        labels
        sideAFontSize
        sideAText
        sideAImageUrl
        sideBFontSize
        sideBText
        sideBImageUrl
        lastTestTime
      }
    }
  }
`;

export default function usePracticeDeckCreator() {
  return useMutation(GQL_NEW_PRACTICE_DECK, {
    client,
    update(cache, { data: { newPracticeDeck } }) {
      usePracticeDeckFetcherCacheUpdater(cache, newPracticeDeck);
      useCardCollectionFetcherCacheUpdater(cache, newPracticeDeck);
    }
  });
}

export function usePracticeDeckFetcherCacheUpdater(cache, newPracticeDeck) {
  if (!usePracticeDeckFetcherCacheState.hasCache) return;
  const data = cache.readQuery({ query: GQL_GET_PRACTICE_DECK });
  data.me.cards.items = newPracticeDeck.items;
  cache.writeQuery({ query: GQL_GET_PRACTICE_DECK, data });
}

export function useCardCollectionFetcherCacheUpdater(cache, newPracticeDeck) {
  if (!useQueryCacheState.hasCache) return;
  const data = cache.readQuery({ query: LIST_CARDS });
  data.me.cards.items = data.me.cards.items.map(cachedItem => {
    for (let newItem of newPracticeDeck.items) {
      if (cachedItem.id === newItem.id) return newItem;
    }
    return cachedItem;
  });
  cache.writeQuery({ query: LIST_CARDS, data });
}
