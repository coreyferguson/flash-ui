
import React from 'react';
import mousetrap from 'mousetrap';
import { Redirect } from 'react-router-dom';

export default class CardListShortcuts extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { createCard: false };
  }

  componentDidMount() {
    mousetrap.bind('c', this.handleCreateCard.bind(this));
  }

  componentWillUnmount() {
    mousetrap.unbind('c');
  }

  render() {
    return (
      <React.Fragment>
        {this.state.createCard && <Redirect push to='/cards/edit' />}
      </React.Fragment>
    );
  }

  handleCreateCard(e) {
    e.preventDefault();
    this.setState({ createCard: true });
  }

}
