import React from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  backgroundColor: string;
  unsplashUrl: string;
}

const FullscreenImage: React.FC<Props> = ({
  backgroundColor,
  unsplashUrl,
  alt,
  ...props
}) => (
  <img
    {...props}
    alt={alt}
    data-unsplash-url={unsplashUrl}
    css={{
      height: '100vh',
      width: '100vw',
      backgroundColor,
      objectFit: 'cover',
    }}
  />
);

export { FullscreenImage };
