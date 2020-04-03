import { gql } from 'apollo-boost';

export const DELETE_CARD = gql`
  mutation deleteCard($userId: String!, $id: String!) {
    deleteCard(
      userId: $userId,
      id: $id
    ) {
      id
    }
  }
`;

export default DELETE_CARD;