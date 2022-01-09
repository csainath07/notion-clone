import Styles from "./_.module.css";

const BookmarkPreview = ({
  title = "-",
  description = "-",
  image = "",
  url = "",
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={Styles.bookmarkPreview}
    >
      <div className={Styles.bookmarkInfo}>
        <h3>{title}</h3>
        <p>{description}</p>
        <span>{url}</span>
      </div>
      {image !== "" ? <img src={image} alt={title} /> : ""}
    </a>
  );
};

export default BookmarkPreview;
