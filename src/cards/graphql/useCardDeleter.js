
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
  const result = useMutation(DELETE_CARD, {
    client,
    update(cache, { data: { deleteCard } }) {
      useCardCollectionFetcherCache(cache, deleteCard);
    }
  });
  const deleteCard = (apolloProps, extraOptions) => {
    const { optimistic } = extraOptions || {};
    if (optimistic) {
      apolloProps = Object.assign({
        optimisticResponse: {
          __typename: 'Mutation',
          deleteCard: {
            __typename: 'Card',
            id: apolloProps.variables.id
          }
        }
      }, apolloProps);
    }
    return result[0](apolloProps);
  };
  return [ deleteCard, result[1] ];
}

export function useCardCollectionFetcherCache(cache, deleteCard) {
  const data = cache.readQuery({ query: LIST_CARDS });
  data.me.cards.items = data.me.cards.items.filter(card => card.id !== deleteCard.id);
  cache.writeQuery({
    query: LIST_CARDS,
    data
  });
}