import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '@bit/overattribution.growme.button';

export default class CardEditSide extends React.PureComponent {
  constructor(props) {
    super(props);
    this.textRef = React.createRef();
    this.fileRef = React.createRef();
    this.handleDeleteImage = this.handleDeleteImage.bind(this);
    this.handleAddImage = this.handleAddImage.bind(this);
    this.state = {
      imageFile: undefined,
      imageSource: props.imageSource,
      imageUrl: props.imageUrl
    };
  }

  componentDidMount() {
    if (this.props.imageUrl && !this.state.imageSource && !this.props.isImageLoading) {
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
          {this.state.imageSource &&
            <React.Fragment>
              <img src={this.state.imageSource} />
              <Button onClick={this.handleDeleteImage} icon='delete' />
            </React.Fragment>
          }
          {!this.state.imageSource &&
            <input type="file" onChange={this.handleAddImage} ref={this.fileRef} className='mousetrap' />
          }
        </div>
      </React.Fragment>
    );
  }

  getValues() {
    return {
      text: this.textRef.current.value,
      imageFile: this.state.imageFile,
      imageUrl: this.state.imageUrl
    };
  }

  handleDeleteImage(e) {
    e.preventDefault();
    this.setState({ imageFile: undefined, imageUrl: undefined, imageSource: undefined });
  }

  handleAddImage(e) {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = e => this.setState({ imageSource: e.target.result });
    this.setState({ imageFile: e.target.files[0] });
    reader.readAsDataURL(e.target.files[0]);
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