import { gql } from 'apollo-boost';

export const GQL_FETCH_PRACTICE_CARDS = gql`
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

export default GQL_FETCH_PRACTICE_CARDS;
