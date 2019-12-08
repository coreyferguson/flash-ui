import React from 'react';
import PropTypes from 'prop-types';
import LoadingPage from '@bit/overattribution.growme.loading-page';
import CardView from '../CardView/CardView';
import CardListStyle, { Menu, ListStyle } from './CardListStyle';
import Navigation from '../../../context/Navigation';
import Button from '@bit/overattribution.growme.button';

export default function CardListView(props={}) {
  React.useEffect(() => { props.onLoad() }, []);
  if (props.error) return <p>error</p>;
  if (props.isLoading && props.items.length === 0) return <LoadingPage style={{ height: '100%' }} />;
  const items = props.itemOrder.map(itemId => {
    return (
      <li key={itemId}><CardView
          activeSide={!props.activeSides || !props.activeSides[itemId] ? 'A' : props.activeSides[itemId]}
          image={props.images[itemId]}
          item={props.items[itemId]}
          onFetchImage={props.onFetchImage}
          onFlipCard={() => {}} />
      </li>
    );
  });
  const handleLoadNextPage = props.next && !props.isLoading
    ? () => { props.onLoadNextPage(props.next) }
    : null;
  return (
    <CardListStyle>
      <Navigation />
      <Menu><Button>create card</Button></Menu>
      <ListStyle>
        {items}
      </ListStyle>
    </CardListStyle>
  );
}

CardListView.propTypes = {
  error: PropTypes.object,
  isLoadingWithExistingData: PropTypes.bool,
  isLoadingWithoutExistingData: PropTypes.bool,
  items: PropTypes.object,
  images: PropTypes.object,
  onLoad: PropTypes.func.isRequired,
  onLoadNextPage: PropTypes.func.isRequired
};

CardListView.defaultProps = {
  items: {},
  isLoadingWithExistingData: false,
  isLoadingWithoutExistingData: true
};