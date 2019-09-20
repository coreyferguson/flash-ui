
import ApolloClient, { gql } from 'apollo-boost';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import CardView from './CardView';

const LIST_CARDS = gql`
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

export default function CardListView() {
  const { loading, error, data } = useQuery(LIST_CARDS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div className='card-list-view'>
      {data.me.cards.items.map(card => <CardView key={card.id} card={card} />)}
    </div>
  )
}
