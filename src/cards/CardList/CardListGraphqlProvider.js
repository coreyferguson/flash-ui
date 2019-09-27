
import { gql } from 'apollo-boost';
import DefaultView from './CardListView';
import React from 'react';
import { useQuery as useDefaultQuery } from '@apollo/react-hooks';
import client from '../../apolloProvider/apolloClient';

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

export default function CardListGraphqlProvider({ CardListView, useQuery }) {
  useQuery = useQuery || useDefaultQuery;
  const { loading, error, data } = useQuery(LIST_CARDS, { client });
  if (loading) return <p>loading</p>;
  if (error) return <p>unknown error occurred</p>;
  const View = CardListView || DefaultView;
  return <View cards={data.me.cards} />;
}
