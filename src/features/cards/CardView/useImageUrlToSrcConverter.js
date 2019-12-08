import React from 'react';
import mediaService from '../../media/mediaService';

export default function useImageUrlToSrcConverter(imageUrl) {
  const [ imageSrc, setImageSrc ] = React.useState();
  React.useMemo(() => {
    if (!imageUrl) setImageSrc(undefined);
    else mediaService.getUrl(imageUrl).then(src => setImageSrc(src));
  }, [imageUrl]);
  return imageSrc;
}