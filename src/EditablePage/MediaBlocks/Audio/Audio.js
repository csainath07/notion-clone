import { useState } from "react";
import { Volume2 } from "react-feather";
import Styles from "./_.module.css";

const AudioBlock = ({ data, onEmbedLinkSubmit }) => {
  const [embedLink, setEmbedLink] = useState(
    data?.content?.audioEmbedUrl || ""
  );

  const onSubmitHandler = () => {
    if (embedLink !== "") {
      onEmbedLinkSubmit?.({ key: "audioEmbedUrl", embedLink });
    }
  };
  return (
    <div className={Styles.mediaAudioBlockContainer}>
      {data?.content?.audioEmbedUrl ? (
        <audio
          src={data?.content?.audioEmbedUrl}
          alt=""
          className={Styles.audioPreview}
          controls
        />
      ) : (
        <div className={Styles.audioActionSection}>
          <div className={Styles.header}>
            <ul>
              <li className={Styles.active}>Embed Link</li>
            </ul>
          </div>
          <div className={Styles.body}>
            <Volume2 size={30} />
            <input
              type="text"
              onChange={(e) => setEmbedLink(e.target?.value?.trim())}
              value={embedLink}
              placeholder="Enter any audio url from web"
            />
            <button onClick={onSubmitHandler} type="button">
              Embed Link
            </button>

            <span className={Styles.note}>Works with any audio from web</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioBlock;
