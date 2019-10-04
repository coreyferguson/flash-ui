
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import client from '../../apolloProvider/apolloClient';

export const GQL_FETCH_CARD = gql`
  query fetchCard($id: String!) {
    me {
      card(id: $id) {
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
  }
`;

export default function useCardFetcher({ cardId, skip }) {
  return useQuery(GQL_FETCH_CARD, { client, skip, variables: { id: cardId } });
}
