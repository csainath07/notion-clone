import { useState } from "react";
import { Bookmark } from "react-feather";
import BookmarkPreview from "./BookmarkPreview";
import Styles from "./_.module.css";

const BookmarkBlock = ({ data, onEmbedLinkSubmit }) => {
  const [embedLink, setEmbedLink] = useState(
    data?.content?.bookmarkEmbedUrl || ""
  );
  const [loading, setLoading] = useState(false);
  const [linkMetaData, setLinkMetaData] = useState(null);

  const onSubmitHandler = async () => {
    if (embedLink !== "") {
      setLoading(true);
      try {
        const resp = await fetch(
          `https://website-metadata.p.rapidapi.com/MetaData/GetMetadata?Url=${embedLink}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "website-metadata.p.rapidapi.com",
              "x-rapidapi-key": process.env.REACT_APP_OPEN_METADATA_API_KEY,
            },
          }
        );
        const result = await resp.json();
        setLinkMetaData(result);
      } catch (err) {
        // handle error
        setLinkMetaData(null);
      } finally {
        setLoading(false);
        onEmbedLinkSubmit?.({ key: "bookmarkEmbedUrl", embedLink });
      }
    }
  };
  return (
    <div className={Styles.mediaBookmarkBlockContainer}>
      {data?.content?.bookmarkEmbedUrl ? (
        <BookmarkPreview
          title={linkMetaData?.["og:title"]}
          description={linkMetaData?.["og:description"]}
          image={linkMetaData?.["og:image"]}
          url={data?.content?.bookmarkEmbedUrl}
        />
      ) : (
        <div className={Styles.bookmarkActionSection}>
          <div className={Styles.header}>
            <ul>
              <li className={Styles.active}>Embed Link</li>
            </ul>
          </div>
          <div className={Styles.body}>
            {loading ? (
              <div>
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <Bookmark size={30} />
                <input
                  type="text"
                  onChange={(e) => setEmbedLink(e.target?.value?.trim())}
                  value={embedLink}
                  placeholder="Enter any url from web"
                />
                <button onClick={onSubmitHandler} type="button">
                  Embed Link
                </button>

                <span className={Styles.note}>Works with any url from web</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkBlock;
