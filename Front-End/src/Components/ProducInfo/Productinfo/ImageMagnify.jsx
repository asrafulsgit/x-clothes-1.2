import React from "react";
import ReactImageMagnify from "react-image-magnify";

const ImageMagnify = (props) => {
  const { smallImage, largeImage } = props;

  const smallImageWithDefaults = smallImage || {
    alt: "Default image description",
    isFluidWidth: true,
    src: "default-image.jpg", 
  };

  const largeImageWithDefaults = largeImage || {
    src: "default-image.jpg", 
    width: 1800,
    height: 2167,
  };

  return (
    <ReactImageMagnify
      smallImage={smallImageWithDefaults}
      largeImage={largeImageWithDefaults}
    />
  );
};

export default ImageMagnify;
