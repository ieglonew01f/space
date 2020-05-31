import * as React from 'react';

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './index.css'

export namespace Message {
  export interface IProps {
    message: any;
  }

  export interface IState {
    message: any;
  }
}

export class Message extends React.Component<Message.IProps, Message.IState> {
  constructor(props: Message.IProps) {
    super(props);

    this.state = {
      message: this.props.message
    }
  }

  latestMessage: any = null;

  scrollToBottom = () => this.latestMessage.scrollIntoView();
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { message } = this.state;
    let messageBody = null;

    if (message.incoming_message) {
      messageBody = (
        <div ref={(el) => { this.latestMessage = el; }} className="message message-incoming">
          <Avatar src={message.user.avatar.url} size="small" icon={<UserOutlined />} />
          <span className="text">{message.message}</span>
        </div>
      )
    }

    if (!message.incoming_message) {
      messageBody = (
        <div ref={(el) => { this.latestMessage = el; }} className="message message-outgoing">
          <span className="text">{message.message}</span>
          <span className={message.seen ? "seen-text" : "hide"}>Seen</span>
        </div>
      )
    }

    return messageBody;
  }
}