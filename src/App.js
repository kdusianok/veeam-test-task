import { useCallback, useEffect, useRef, useState } from "react";
import UploadFile from "./UploadFile";
import Labels from "./Labels";
import "./styles.css";

export default function App() {
  const imageRef = useRef(null);
  const [image, setImage] = useState();
  const [imageSize, setImageSize] = useState();
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const onResize = () => {
      if (imageRef.current) {
        const diffWidth = imageRef.current.width / imageSize.width;
        const diffHeight = imageRef.current.height / imageSize.height;

        setLabels((labels) =>
          labels.map((label) => {
            return {
              ...label,
              left: label.left * diffWidth,
              top: label.top * diffHeight
            };
          })
        );

        setImageSize({
          width: imageRef.current.width,
          height: imageRef.current.height
        });
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [imageSize]);

  useEffect(() => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.width,
        height: imageRef.current.height
      });
    }
  }, [image]);

  const addLabel = useCallback((e) => {
    setLabels((labels) => [
      ...labels,
      {
        text: "Метка",
        editable: true,
        left: e.clientX,
        top: e.clientY
      }
    ]);
  }, []);

  return (
    <div className="App" onClick={addLabel}>
      {image ? (
        <>
          <img
            alt="uploadedFile"
            src={image.src}
            ref={imageRef}
            style={{
              width: image.width,
              height: image.height
            }}
          />
          <Labels labels={labels} setLabels={setLabels} />
        </>
      ) : (
        <UploadFile setImage={setImage} />
      )}
    </div>
  );
}
