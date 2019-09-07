
import React from 'react';

export default class CardSideView extends React.PureComponent {
  render() {
    return (
      <div className="card card-side-view">
        {(!!this.props.text || !this.props.image) && <div className="card-content"><p className='flow-text'>{this.props.text}</p></div>}
        <div className="card-image"><img src={this.props.image} /></div>
      </div>
    );
  }
}
