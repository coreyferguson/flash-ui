import { gql } from 'apollo-boost';

const GQL_GET_CARD = gql`
  query getCard($id: String!) {
    me {
      card(id: $id) {
        id
        lastTestTime
        sideAText
        sideAImageUrl
        sideAFontSize
        sideBText
        sideBImageUrl
        sideBFontSize
        labels
      }
    }
  }
`;

export default GQL_GET_CARD;
