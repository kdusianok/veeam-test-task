export const getImageData = async (imageSrc) => {
  const image = new Image();
  image.src = imageSrc;
  return await new Promise((resolve) => {
    image.onload = function () {
      const imageData = {
        src: this.src,
        width: "auto",
        height: "auto"
      };
      if (this.width > this.height) {
        imageData.width = "100%";
      } else {
        imageData.height = "100%";
      }

      image.remove();
      resolve(imageData);
    };
  });
};
