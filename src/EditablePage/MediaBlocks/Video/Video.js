/* eslint-disable no-useless-escape */
import { useState } from "react";
import { Film } from "react-feather";
import Styles from "./_.module.css";

const VideoBlock = ({ data, onEmbedLinkSubmit }) => {
  const [embedLink, setEmbedLink] = useState(
    data?.content?.videoEmbedUrl || ""
  );

  /** Private Method */
  const _checkAndGetYoutubeEmbedUrl = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=0`;
    }
    return url;
  };
  /** Private Methods end */

  const onSubmitHandler = () => {
    if (embedLink !== "") {
      const url = _checkAndGetYoutubeEmbedUrl(embedLink);
      onEmbedLinkSubmit?.({ key: "videoEmbedUrl", embedLink: url });
    }
  };

  return (
    <div className={Styles.mediaVideoBlockContainer}>
      {data?.content?.videoEmbedUrl ? (
        <iframe
          title="video"
          className={Styles.videoPreview}
          src={data?.content?.videoEmbedUrl}
        ></iframe>
      ) : (
        <div className={Styles.videoActionSection}>
          <div className={Styles.header}>
            <ul>
              <li className={Styles.active}>Embed Link</li>
            </ul>
          </div>
          <div className={Styles.body}>
            <Film size={30} />
            <input
              type="text"
              onChange={(e) => setEmbedLink(e.target?.value?.trim())}
              value={embedLink}
              placeholder="Enter any video url from web"
            />
            <button onClick={onSubmitHandler} type="button">
              Embed Link
            </button>

            <span className={Styles.note}>Works with any video from web</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoBlock;
