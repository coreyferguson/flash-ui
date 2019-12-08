import React from 'react';
import PropTypes from 'prop-types';
import useTextToMarkdownConverter from '../useTextToMarkdownConverter';

export default function CardSideView(props) {
  const markdown = useTextToMarkdownConverter(props.text);
  const side = props.side;
  let imageSource, isImageLoading;
  if (props.image && props.image[side]) {
    imageSource = props.image[side].source
    isImageLoading = props.image[side].isLoading
  }
  React.useEffect(() => {
    if (!imageSource && !isImageLoading && props.imageUrl && props.onFetchImage) {
      const { id, imageUrl } = props;
      props.onFetchImage(id, side, imageUrl);
    }
  }, [ imageSource, isImageLoading, props.imageUrl, props.onFetchImage ]);
  const style = { background: `url(${imageSource}) center/contain no-repeat` };
  const res = (
    <React.Fragment>
      {markdown && <span dangerouslySetInnerHTML={{__html: markdown}} />}
      {imageSource && <figure className='contained' style={style} />}
    </React.Fragment>
  );
  return res;
}

CardSideView.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.object,
  imageUrl: PropTypes.string,
  onFetchImage: PropTypes.func,
  side: PropTypes.string,
  text: PropTypes.string
};