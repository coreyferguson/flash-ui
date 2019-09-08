
import React from 'react';
import PageContainer from '../PageContainer';
import PropTypes from 'prop-types';
import EditCardSideView from './EditCardSideView';
import CardSideView from './CardSideView';
import './editCardView.scss';

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
      <div className='editCard'>
        {!!cardId && <h1>Edit Card</h1>}
        {!cardId && <h1>Create Card</h1>}
        <div className='sides'>
          <div className='side'><EditCardSideView sideName='A' onChange={card => this.handleEditCardSideViewChange('A', card)} /></div>
          <div className='side'>
            <h2>Preview</h2>
            <CardSideView {...this.state.sideA} />
          </div>
        </div>
        <div className='sides'>
          <div className='side'><EditCardSideView sideName='B' onChange={card => this.handleEditCardSideViewChange('B', card)} /></div>
          <div className='side'>
            <h2>Preview</h2>
            <CardSideView {...this.state.sideB} />
          </div>
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
