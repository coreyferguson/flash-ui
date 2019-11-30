
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import client from '../../../context/apolloProvider/apolloClient';

export const GQL_FETCH_CARD = gql`
  query fetchCard($id: String!) {
    me {
      card(id: $id) {
        id
        labels
        sideAFontSize
        sideAText
        sideAImageUrl
        sideAFontSize
        sideBFontSize
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
