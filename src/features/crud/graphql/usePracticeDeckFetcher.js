
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import client from '../../../context/apolloProvider/apolloClient';

export const GQL_GET_PRACTICE_DECK = gql`
  query getPracticeDeck {
    me {
      sub
      cards(label: "practice", orderBy: "lastTestTime") {
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
  }
`;

export const cacheState = { hasCache: false };

export default function usePracticeDeckFetcher() {
  cacheState.hasCache = true;
  return useQuery(GQL_GET_PRACTICE_DECK, { client });
}
