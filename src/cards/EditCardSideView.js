
import React from 'react';
import PropTypes from 'prop-types';
import mediaService from '../media/mediaService';

export default class EditCardSideView extends React.PureComponent {
  constructor(props) {
    super(props);
    this._mediaService = props.mediaService || mediaService;
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
        <h4 className='header'>Side {this.props.sideName}</h4>
        <div className='input-field col s12'>
          <textarea
            className='materialize-textarea'
            placeholder='Text'
            ref='text'
            onChange={this.handleChange}
          >
          </textarea>
        </div>
        <div className="file-field input-field card-image">
          <input type="file" onChange={this.uploadFile} ref='image' />
          {!!this.state.imageUrl && <img src={this.state.imageUrl} />}
          <i className='material-icons red-text text-lighten-1'>add_a_photo</i>
          {this.state.loading && <p>loading...</p>}
          {/* the following line stops a javascript error from materialize */}
          <input className="file-path validate" type="text" style={{ display: 'none' }} />
        </div>
      </div>
    );
  }

  uploadFile() {
    if (!this.refs.image.files[0]) return;
    this.setState({ loading: true });
    const file = this.refs.image.files[0];
    const name = file.name;
    return this._mediaService.upload(name, file).then(() => {
      return this._mediaService.getUrl(name);
    }).then(url => {
      this.setState({ loading: false, imageUrl: url });
      this.handleChange();
    });
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
