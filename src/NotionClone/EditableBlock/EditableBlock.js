import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
import { Plus, Trash2 } from "react-feather";
import { BLOCK_TYPES } from "../../utils/constants";

import Styles from "./_.module.css";

class EditableBlock extends Component {
  state = {
    data: this.props?.data || {
      type: BLOCK_TYPES["HTML"],
      content: {
        parentTag: "p",
        innerHtml: "",
      },
    },
    previousKey: null,
  };

  currentBlockRef = React.createRef();

  // Event Handlers
  contentEditableChangeHandler = (e) => {
    this.setState(
      {
        data: {
          ...this.state.data,
          content: {
            ...this.state.data.content,
            innerHtml: e.target.value,
          },
        },
      },
      () => {
        this.props.onUpdateBlock(this.state.data);
      }
    );
  };

  contentEditableKeyDownHandler = (e) => {
    // Adding new blocks
    if (e.key === "Enter") {
      if (this.state.previousKey !== "Shift") {
        e.preventDefault();
        this._addNewBlock();
      }
    }

    this.setState({
      previousKey: e.key,
    });
  };

  renderBlock = (block) => {
    const { type, content } = block;

    switch (type) {
      case BLOCK_TYPES["HTML"]:
        return (
          <ContentEditable
            innerRef={this.currentBlockRef}
            className="editable-block_html"
            tagName={content.parentTag}
            html={content.innerHtml}
            onChange={this.contentEditableChangeHandler}
            onKeyDown={this.contentEditableKeyDownHandler}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div className={Styles.editableBlockContainer}>
        <div className={Styles.blockOptions}>
          <Plus
            size={16}
            className={Styles.addBlockIcon}
            onClick={this._addNewBlock}
          />
          {this.props.isDeleteOptionVisible ? (
            <Trash2 size={16} className={Styles.removeBlockIcon} />
          ) : (
            ""
          )}
        </div>
        <div className={Styles.contentBlockContainer}>
          {/* Render different type of content block */}
          {this.renderBlock(this.state.data)}

          {/* Render custom placeholder */}
          {this._isPlaceholderVisible(this.state?.data?.content) ? (
            <div className={Styles.contentPlaceholder}>
              <p>Start typing...</p>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  /** Private Methods */
  _isPlaceholderVisible = (content) =>
    content?.innerHtml === "" || content?.innerHtml === "<br>";

  _addNewBlock = () => {
    this.props.onAddNewBlock({
      currentBlockId: this.state.data.id,
      currentBlockRef: this.currentBlockRef.current,
    });
  };
}

export default EditableBlock;
