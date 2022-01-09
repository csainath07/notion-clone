import { Bold, Type, Image, Film, Volume2 } from "react-feather";
import { BLOCK_TYPES } from "../../utils/constants";
import Styles from "./_.module.css";

/** Commands */
const COMMANDS = {
  text: {
    title: "Basics",
    options: [
      {
        id: "command-basic_p",
        icon: <Type size={20} />,
        label: "Normal Text",
        subText: "Just start writing with pain text",
        tag: "p",
        type: BLOCK_TYPES["HTML"],
      },
      {
        id: "command-basic_strong",
        icon: <Bold size={20} />,
        label: "Bold",
        subText: "Just start writing with bold text",
        tag: "strong",
        type: BLOCK_TYPES["HTML"],
      },
    ],
  },
  headings: {
    title: "Headings",
    options: [
      {
        id: "command-headings_h1",
        icon: <Type size={20} />,
        label: "Heading 1",
        subText: "Big section heading",
        tag: "h1",
        type: BLOCK_TYPES["HTML"],
      },
      {
        id: "command-headings_h2",
        icon: <Type size={20} />,
        label: "Heading 2",
        subText: "Medium section heading",
        tag: "h2",
        type: BLOCK_TYPES["HTML"],
      },
      {
        id: "command-headings_h3",
        icon: <Type size={20} />,
        label: "Heading 3",
        subText: "small section heading",
        tag: "h3",
        type: BLOCK_TYPES["HTML"],
      },
    ],
  },
  media: {
    title: "Media",
    options: [
      {
        id: "command-media_img",
        icon: <Image size={20} />,
        label: "Image",
        subText: "Upload or Embed with link",
        tag: "div",
        type: BLOCK_TYPES["IMAGE"],
      },
      {
        id: "command-media_video",
        icon: <Film size={20} />,
        label: "Video",
        subText: "Upload or Embed with link",
        tag: "div",
        type: BLOCK_TYPES["VIDEO"],
      },
      {
        id: "command-media_audio",
        icon: <Volume2 size={20} />,
        label: "Audio",
        subText: "Upload or Embed with link",
        tag: "div",
        type: BLOCK_TYPES["AUDIO"],
      },
    ],
  },
};

const CommandPopup = ({ commandPopupPosition, onCommandSelect }) => {
  const renderOptions = (options) => {
    return options.map((command) => (
      <dd
        key={command.id}
        tabIndex="0"
        role="button"
        onClick={() => onCommandSelect(command)}
      >
        <div className={Styles.commandIcon}>{command.icon}</div>
        <div className={Styles.commandInfo}>
          <span>{command.label}</span>
          <p>{command.subText}</p>
        </div>
      </dd>
    ));
  };

  return (
    <div
      className={Styles.commandPopupContainer}
      style={{
        top: commandPopupPosition.x,
        left: commandPopupPosition.y,
      }}
    >
      <dl>
        {Object.keys(COMMANDS).map((key) => {
          return (
            <div key={key}>
              <dt>{COMMANDS[key]["title"]}</dt>
              {renderOptions(COMMANDS[key]["options"])}
            </div>
          );
        })}
      </dl>
    </div>
  );
};

export default CommandPopup;
