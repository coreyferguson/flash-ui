
import React from 'react';
import PageContainer from '../PageContainer';
import PropTypes from 'prop-types';
import EditCardSideView from './EditCardSideView';
import CardSideView from './CardSideView';
import './EditCardView.scss';

export default class EditCardView extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleEditCardSideViewChange = this.handleEditCardSideViewChange.bind(this);
    this.state = {
      sideA: {},
      sideB: {}
    };
  }

  render() {
    const cardId = this.props.cardId;
    return (
      <div className='edit-card'>
        {!!cardId && <h1>edit card</h1>}
        {!cardId && <h1>create a card</h1>}
        <div className='sides'>
          <div className='side'><EditCardSideView sideName='1' onChange={card => this.handleEditCardSideViewChange('A', card)} /></div>
          <div className='side'><EditCardSideView sideName='2' onChange={card => this.handleEditCardSideViewChange('B', card)} /></div>
        </div>
        <div className='save'>
          <button className='waves-effect waves-light btn'>Save</button>
        </div>
      </div>
    );
  }

  handleEditCardSideViewChange(side, card) {
    this.setState({ [`side${side}`]: card });
  }

}

EditCardView.propTypes = {
  cardId: PropTypes.number
};
