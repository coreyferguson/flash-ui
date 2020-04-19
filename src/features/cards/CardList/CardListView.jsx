import React from 'react';
import PropTypes from 'prop-types';
import LoadingPage from '@bit/overattribution.growme.loading-page';
import CardView from '../CardView';
import CardListStyle, { Menu, ListStyle } from './CardListStyle';
import Navigation from '../../../context/Navigation';
import Button from '@bit/overattribution.growme.button';
import { Link, useHistory } from 'react-router-dom';
import HotkeyShortcut from '../../shortcuts/Shortcuts/HotkeyShortcut';

export default function CardListView(props={}) {
  React.useEffect(() => {
    if (!props.isFetchCardsAlreadyCompletedOnce) props.onLoad();
  }, [ props.isFetchCardsAlreadyCompletedOnce ]);
  const history = useHistory();
  if (props.error) return <p>error</p>;
  if (props.isLoading && Object.keys(props.cardMap).length === 0) return <LoadingPage style={{ height: '100%' }} />;
  const cards = props.cardsOrderByCreationDate.map(itemId => <li key={itemId}><CardView id={itemId} /></li>);
  const handleLoadNextPage = props.next && !props.isLoading
    ? () => { props.onLoadNextPage(props.next) }
    : null;
  const handleCreateCard = e => {
    if (e) e.preventDefault();
    history.push('/cards/edit');
  }
  return (
    <CardListStyle>
      <HotkeyShortcut combination='c' callback={handleCreateCard} />
      <Navigation />
      <Menu><Button component={<Link to='/cards/edit'>create card</Link>} /></Menu>
      <ListStyle>
        {cards}
      </ListStyle>
    </CardListStyle>
  );
}

CardListView.propTypes = {
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  isFetchCardsAlreadyCompletedOnce: PropTypes.bool,
  cardsOrderByCreationDate: PropTypes.arrayOf(PropTypes.string),
  cardMap: PropTypes.object,
  onLoad: PropTypes.func.isRequired,
  onLoadNextPage: PropTypes.func.isRequired
};

CardListView.defaultProps = {
  cardMap: {},
  isLoading: true,
};
