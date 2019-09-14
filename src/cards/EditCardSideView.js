
import React from 'react';
import PropTypes from 'prop-types';
// import mediaService from '../media/mediaService';
import './EditCardSideView.scss';
import TextareaAutosize from 'react-textarea-autosize';

export default class EditCardSideView extends React.PureComponent {
  constructor(props) {
    super(props);
    // this._mediaService = props.mediaService || mediaService;
    this.uploadFile = this.uploadFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      loading: false,
      imageUrl: undefined
    };
  }

  render() {
    return (
      <div className='edit-card-side-view'>
        <h2>side {this.props.sideName}</h2>
        <TextareaAutosize placeholder='flashcard text' maxRows='20' />
        {/* <textarea
          placeholder='Text'
          ref='text'
          onChange={this.handleChange}
        /> */}
        <div className='media'>
          <input type="file" onChange={this.uploadFile} ref='image' />
          {this.state.loading && <span>loading...</span>}
        </div>
      </div>
    );
  }

  uploadFile() {
    if (!this.refs.image.files[0]) return;
    this.setState({ loading: true });
    const file = this.refs.image.files[0];
    const name = file.name;
    // return this._mediaService.upload(name, file).then(() => {
    //   return this._mediaService.getUrl(name);
    // }).then(url => {
    //   this.setState({ loading: false, imageUrl: url });
    //   this.handleChange();
    // });
  }

  handleChange() {
    const text = this.refs.text.value;
    const image = this.state.imageUrl;
    if (this.props.onChange) this.props.onChange({ text, image });
  }
}

EditCardSideView.propTypes = {
  sideName: PropTypes.string.isRequired,
  onChange: PropTypes.func
};
