
import ApolloClient, { gql } from 'apollo-boost';
import DefaultView from './CardListView';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

export const LIST_CARDS = gql`
  {
    me {
      cards {
        items {
          id
          labels
          sideAText
          sideAImageUrl
          sideBText
          sideBImageUrl
        }
      }
    }
  }
`;

export default function CardListGraphqlProvider({ CardListView }) {
  const { loading, error, data } = useQuery(LIST_CARDS);
  if (loading) return <p>loading</p>;
  if (error) return <p>unknown error occurred</p>;
  const View = CardListView || DefaultView;
  return <View cards={data.me.cards} />;
}
