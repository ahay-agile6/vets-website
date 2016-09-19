import React from 'react';

import ButtonDelete from '../buttons/ButtonDelete';
import CharacterCount from '../compose/CharacterCount';

// TODO: Add attachments button / components
class MessageSend extends React.Component {
  render() {
    const isDisabled = this.props.charCount < 0;

    return (
      <div className={this.props.cssClass}>
        <button
            disabled={isDisabled}
            type="button"
            onClick={this.props.onSend}>Send</button>
        <button
            disabled={isDisabled}
            className="usa-button-outline messaging-btn-save"
            type="button"
            value="save"
            onClick={this.props.onSave}>Save As Draft</button>
        <ButtonDelete
            compact
            onClickHandler={this.props.onDelete}/>
        <CharacterCount
            count={this.props.charCount}
            cssClass="messaging-characters"/>
      </div>
    );
  }
}

MessageSend.propTypes = {
  charCount: React.PropTypes.number,
  cssClass: React.PropTypes.string,
  onSave: React.PropTypes.func.isRequired,
  onSend: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired
};

export default MessageSend;
