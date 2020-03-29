import React from 'react';
import PropTypes from 'prop-types';
import LoadingPage from '@bit/overattribution.growme.loading-page';
import CardView from '../CardView';
import CardListStyle, { Menu, ListStyle } from './CardListStyle';
import Navigation from '../../../context/Navigation';
import Button from '@bit/overattribution.growme.button';

export default function CardListView(props={}) {
  React.useEffect(() => { props.onLoad() }, []);
  if (props.error) return <p>error</p>;
  if (props.isLoading && props.items.length === 0) return <LoadingPage style={{ height: '100%' }} />;
  const items = props.itemOrder.map(itemId => <li key={itemId}><CardView id={itemId} /></li>);
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
  isLoading: PropTypes.bool,
  itemOrder: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.object,
  onLoad: PropTypes.func.isRequired,
  onLoadNextPage: PropTypes.func.isRequired
};

CardListView.defaultProps = {
  items: {},
  isLoading: true,
};