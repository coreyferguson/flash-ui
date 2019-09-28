
import client from '../../apolloProvider/apolloClient';
import DefaultView from './CardListView';
import Interim from '../../Interim';
import PageContainer from '../../PageContainer';
import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery as useDefaultQuery } from '@apollo/react-hooks';

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
  if (loading) return <Interim />;
  if (error) return <p>unknown error occurred</p>;
  const View = CardListView || DefaultView;
  return <PageContainer><View cards={data.me.cards} /></PageContainer>;
}
