import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

export default class CardEditSide extends React.PureComponent {
  constructor(props) {
    super(props);
    this.textRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.imageUrl && !this.props.imageSource && !this.props.isImageLoading) {
      this.props.onFetchImage(this.props.sideName, this.props.imageUrl);
    }
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

        <div className='media'>
          {this.props.imageSource && <img src={this.props.imageSource} />}
        </div>
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
  imageSource: PropTypes.string,
  isImageLoading: PropTypes.bool,
  onFetchImage: PropTypes.func.isRequired,
  sideName: PropTypes.string.isRequired,
  text: PropTypes.string,
};