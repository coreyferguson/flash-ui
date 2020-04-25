import { gql } from 'apollo-boost';

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

export default GQL_NEW_PRACTICE_DECK;