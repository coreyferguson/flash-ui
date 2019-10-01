
import { gql } from 'apollo-boost';
import { LIST_CARDS } from '../CardList/CardListGraphqlProvider';
import { useMutation } from '@apollo/react-hooks';
import client from '../../apolloProvider/apolloClient';

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

export default function useCardDeleter() {
  return useMutation(DELETE_CARD, {
    client,
    update(cache, { data: { deleteCard } }) {
      useCardCollectionFetcherCache(cache, deleteCard);
    }
  });
}

export function useCardCollectionFetcherCache(cache, deleteCard) {
  const data = cache.readQuery({ query: LIST_CARDS });
  data.me.cards.items = data.me.cards.items.filter(card => card.id !== deleteCard.id);
  cache.writeQuery({
    query: LIST_CARDS,
    data
  });
}