import { Component } from "react";
import EditableBlock from "./EditableBlock/EditableBlock";
import { BLOCK_TYPES } from "../utils/constants";
import Styles from "./_.module.css";

/** To calculate unique id for each block */
const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/** Blank block details object */
const GET_NEW_BLANK_BLOCK = () => ({
  id: uid(),
  type: BLOCK_TYPES["HTML"],
  content: {
    parentTag: "p",
    innerHtml: "",
  },
  html: "",
});

class NotionClone extends Component {
  state = {
    blocks: [GET_NEW_BLANK_BLOCK()],
  };

  // Adding new block
  addNewContentBlockHandler = ({ currentBlockId, currentBlockRef }) => {
    const _blocks = [...this.state.blocks];
    const currentBlockIndex = this._getCurrentBlockIndex(currentBlockId);
    if (currentBlockIndex !== -1) {
      _blocks.splice(currentBlockIndex + 1, 0, GET_NEW_BLANK_BLOCK());
      this.setState(
        {
          blocks: [..._blocks],
        },
        () => {
          this._getNextContentEditableBlockRef(currentBlockRef)?.focus();
        }
      );
    }
  };

  // Updating blocks
  updateContentBlocksHandler = (updatedBlock) => {
    const _blocks = [...this.state.blocks];
    const updatedBlockIndex = this._getCurrentBlockIndex(updatedBlock.id);
    if (updatedBlockIndex !== 1) {
      _blocks[updatedBlockIndex] = { ...updatedBlock };
      this.setState({
        blocks: [..._blocks],
      });
    }
  };

  // Delete Block
  deleteContentBlockHandler = ({ currentBlockId }) => {
    const _blocks = [...this.state.blocks];
    const currentBlockIndex = this._getCurrentBlockIndex(currentBlockId);
    if (currentBlockIndex !== -1) {
      _blocks.splice(currentBlockIndex, 1);
      this.setState({
        blocks: [..._blocks],
      });
    }
  };

  render() {
    return (
      <section className={Styles.notionCloneContainer}>
        {this.state.blocks.map((block) => (
          <EditableBlock
            key={block.id}
            data={block}
            isDeleteOptionVisible={this.state.blocks.length > 1}
            onDeleteBlock={this.deleteContentBlockHandler}
            onUpdateBlock={this.updateContentBlocksHandler}
            onAddNewBlock={this.addNewContentBlockHandler}
          />
        ))}
      </section>
    );
  }

  /** Private methods */
  _getNextContentEditableBlockRef = (currentBlockRef) => {
    return currentBlockRef?.parentElement?.parentElement?.nextElementSibling
      ?.children?.[1]?.children?.[0];
  };

  _getCurrentBlockIndex = (currentBlockId) => {
    const _blocks = [...this.state.blocks];
    return _blocks.findIndex((block) => block.id === currentBlockId);
  };
}

export default NotionClone;
