import { useState } from "react";
import { Image } from "react-feather";
import Styles from "./_.module.css";

const ImageBlock = ({ data, onEmbedLinkSubmit }) => {
  const [embedLink, setEmbedLink] = useState(
    data?.content?.imageEmbedUrl || ""
  );

  const onSubmitHandler = () => {
    if (embedLink !== "") {
      onEmbedLinkSubmit?.({ key: "imageEmbedUrl", embedLink });
    }
  };
  return (
    <div className={Styles.mediaImageBlockContainer}>
      {data?.content?.imageEmbedUrl ? (
        <img
          src={data?.content?.imageEmbedUrl}
          alt=""
          className={Styles.imagePreview}
        />
      ) : (
        <div className={Styles.imageActionSection}>
          <div className={Styles.header}>
            <ul>
              <li className={Styles.active}>Embed Link</li>
            </ul>
          </div>
          <div className={Styles.body}>
            <Image size={30} />
            <input
              type="text"
              onChange={(e) => setEmbedLink(e.target?.value?.trim())}
              value={embedLink}
              placeholder="Enter any image url from web"
            />
            <button onClick={onSubmitHandler} type="button">
              Embed Link
            </button>

            <span className={Styles.note}>Works with any image from web</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageBlock;
