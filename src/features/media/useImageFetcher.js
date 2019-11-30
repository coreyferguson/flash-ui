
import { useEffect, useState } from 'react';
import mediaService from './mediaService';

export default function useImageFetcher(imageUrl) {
  const [ image, setImage ] = useState();
  useEffect(() => {
    if (imageUrl) {
      mediaService.getUrl(imageUrl).then(image => {
        setImage(image);
      });
    }
  });
  return [ image, setImage ];
}