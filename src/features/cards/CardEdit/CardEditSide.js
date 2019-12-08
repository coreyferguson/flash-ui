import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

export default class CardEditSide extends React.PureComponent {
  constructor(props) {
    super(props);
    this.textRef = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        <h2>side {this.props.sideName}</h2>
        <TextareaAutosize
          inputRef={this.textRef}
          placeholder='flashcard text'
          maxRows={20}
          defaultValue={this.props.text || ''}
          className='mousetrap' />
      </React.Fragment>
    );
  }

  getValues() {
    return {
      text: this.textRef.current.value
    }
  }
}

CardEditSide.propTypes = {
  // focusOnMount: PropTypes.bool,
  // image: PropTypes.string,
  // imageLoading: PropTypes.bool,
  sideName: PropTypes.string.isRequired,
  text: PropTypes.string
};