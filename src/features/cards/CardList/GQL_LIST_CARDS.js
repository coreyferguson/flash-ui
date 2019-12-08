import { gql } from 'apollo-boost';

const GQL_LIST_CARDS = gql`
  query fetchCards($next: String) {
    me {
      cards(pageSize: 20, next: $next) {
        next
        items {
          id
          sideAText
          sideAImageUrl
          sideAFontSize
          sideBText
          sideBImageUrl
          sideBFontSize
          labels
          lastTestTime
        }
      }
    }
  }
`;

export default GQL_LIST_CARDS;
