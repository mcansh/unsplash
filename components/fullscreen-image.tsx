import React from 'react';
import { SimpleImg } from 'react-simple-img';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  backgroundColor: string;
  unsplashUrl: string;
  src: string;
}

const FullscreenImage: React.FC<Props> = ({
  backgroundColor,
  unsplashUrl,
  ...props
}) => (
  <SimpleImg
    {...props}
    data-unsplash-url={unsplashUrl}
    placeholder={backgroundColor}
    width="100vw"
    height="100vh"
    style={{ backgroundColor, zIndex: -1 }}
    imgStyle={{ objectFit: 'cover' }}
  />
);

export { FullscreenImage };
