import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
import { Plus, Trash2 } from "react-feather";
import CommandPopup from "../CommandPopup/CommandPopup";
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
    backupHtml: "",
    isCommandPopupOpen: false,
    commandPopupPosition: {
      x: null,
      y: null,
    },
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
    // Handle Commands
    if (e.key === "/") {
      this.setState({ backupHtml: this.state.data.content.innerHtml });
    }

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

  contentEditableKeyUpHandler = (e) => {
    if (e.key === "/") {
      this._handleCommandPopupOpen();
    }
  };

  onCommandSelectHandler = (command) => {
    switch (command.type) {
      case BLOCK_TYPES["HTML"]:
        this.setState(
          {
            data: {
              ...this.state.data,
              content: {
                ...this.state.data.content,
                parentTag: command.tag,
                innerHtml: this.state.backupHtml,
              },
            },
          },
          () => {
            this._handleCommandPopupClose();
            this.currentBlockRef?.current?.focus();
          }
        );
        break;
      default:
        return;
    }
  };

  /** Render different type of command blocks */
  renderContentBlock = (block) => {
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
            onKeyUp={this.contentEditableKeyUpHandler}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <div className={Styles.editableBlockContainer}>
          <div className={Styles.blockOptions}>
            <Plus
              size={16}
              className={Styles.addBlockIcon}
              onClick={this._addNewBlock}
            />
            {this.props.isDeleteOptionVisible ? (
              <Trash2
                size={16}
                className={Styles.removeBlockIcon}
                onClick={this._deleteBlock}
              />
            ) : (
              ""
            )}
          </div>
          <div className={Styles.contentBlockContainer}>
            {/* Render different type of content block */}
            {this.renderContentBlock(this.state.data)}

            {/* Render custom placeholder */}
            {this._isPlaceholderVisible(this.state?.data?.content) ? (
              <div className={Styles.contentPlaceholder}>
                <p>Start typing...</p>
              </div>
            ) : null}
          </div>
        </div>
        {this.state.isCommandPopupOpen ? (
          <CommandPopup
            onCommandSelect={this.onCommandSelectHandler}
            commandPopupPosition={this.state.commandPopupPosition}
          />
        ) : (
          ""
        )}
      </>
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

  _deleteBlock = () => {
    this.props.onDeleteBlock({
      currentBlockId: this.state.data.id,
    });
  };

  _getCaretCoordinates = () => {
    let x = 0;
    let y = 0;
    const selection = window.getSelection();
    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange();
      range.collapse(false);
      const rect = range.getClientRects()[0];
      if (rect) {
        x = rect.top;
        y = rect.left;
      }
    }
    return { x, y };
  };

  _handleCommandPopupOpen = () => {
    const { x, y } = this._getCaretCoordinates();
    this.setState({
      commandPopupPosition: { x, y },
      isCommandPopupOpen: true,
    });
    document.addEventListener("click", this._handleCommandPopupClose);
  };

  _handleCommandPopupClose = () => {
    this.setState({
      backupHtml: null,
      isCommandPopupOpen: false,
      commandPopupPosition: {
        x: null,
        y: null,
      },
    });
    document.removeEventListener("click", this._handleCommandPopupClose);
  };
}

export default EditableBlock;
