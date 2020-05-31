import * as React from 'react';

import { ActionCableConsumer } from 'react-actioncable-provider';
import { Avatar, Row, Col, Button } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';

import { cable, axios, CURRENT_USER, outGoingMessageSound, incomingMessageSound } from '../common/constants';
import { Message } from './message';

import './index.css';

export namespace Inbox {
  export interface IProps {

  }

  export interface IState {
    message: string;
    withUser: any;
    conversation: any;
    isTyping: boolean;
  }
}

export class Inbox extends React.Component<Inbox.IProps, Inbox.IState> {
  constructor(props: Inbox.IProps) {
    super(props);

    this.state = {
      message: "",
      isTyping: false,
      withUser: {
        name: '',
        avatar: {
          url: ''
        },
        bio: ''
      },
      conversation: {
        messages: [],
        user: {
          name: '',
          avatar: {
            url: ''
          },
          bio: ''
        },
        uuid: ''
      },
    }

    this.eventChannel = cable.subscriptions.create({
      channel: 'EventChannel',
      user: CURRENT_USER.id
    });

    this.loadConv();
  }

  readonly eventChannel: any = null;
  timeout: any;

  loadConv = () => {
    let hash = window.location.hash.split('/');
    let with_id = hash[hash.length - 1];

    //if conv id is not found load the most 
    //recent conv
    if (with_id && with_id !== 'inbox') {
      axios
        .get('/conversations/' + with_id)
        .then((response) => {
          this.respCallback(response.data);
        })
        .catch((err) => {
          
        });
    } else {
      axios
        .get('/conversations')
        .then((response) => {
          const lastConv = response.data[0];
          const user = lastConv.user_details;

          (window.location as any) = '#/inbox/' + user.uuid;

        })
        .catch((err) => {
          
        });
    }
  }

  respCallback = (resp: any) => {
    this.setState({
      withUser: resp.user_details,
      conversation: resp
    });
  }

  handleChangeInput = event => {
    const { value } = event.target;

    this.setState({
      message: value,
    });
  };

  send = () => {
    let { message, withUser, conversation } = this.state;
    this.createLocalConv();
    this.scrollToBottom();

    axios
      .post('/messages', {
        for_id: withUser.uuid,
        message: message,
        conv_id: conversation.uuid
      })
      .then((response) => {

      })
      .catch((err) => {
        
      });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey){
      this.send();
    }
  }

  scrollToBottom = () => {
    var objDiv = document.getElementsByClassName("message-conversation") as any;
    objDiv[0].scrollTop = objDiv[0].scrollHeight - 150;
  }

  createLocalConv = () => {
    const { message, conversation } = this.state;
    let newMessage = {
      message: {
        incoming_message: false,
        message: message,
        seen: false,
        user: CURRENT_USER,
        uuid: ""
      }
    }

    let newMessages = [...conversation.messages, newMessage];
    conversation.messages = newMessages

    this.setState({
      conversation: conversation,
      message: "",
    });

    outGoingMessageSound.play();
  }

  handleReceived = (msg) => {
    const { conversation } = this.state;
    const { event } = msg;

    if (event.is_typing) {
      this.setState({
        isTyping: event.value
      })
      return;
    }

    let newMessages = [...conversation.messages, {message:  event.new_message}];
    conversation.messages = newMessages;

    this.setState({
      conversation: conversation
    });

    incomingMessageSound.play();
  }

  handleConnect = (msg) => {
    this.loadConv();
  }

  sendIsTyping = () => {
    clearTimeout(this.timeout);
    const { withUser } = this.state;
    this.eventChannel.perform('is_typing', {
      for_id: withUser.id,
      is_typing: true
    });

    this.timeout = setTimeout(() => {
      this.eventChannel.perform('is_typing', {
        for_id: withUser.id,
        is_typing: false
      });
    }, 2000);
  }

  render() {
    const { withUser, conversation, isTyping} = this.state;
    const channelToListen = {
      channel: "EventChannel",
      user: CURRENT_USER.id
    }

    return(
      <div className="center-col message-container">
        <div className="profile-header">
          <a href={"#/profile/" + withUser.uuid}>
            <Avatar src={withUser.avatar.url} icon={<UserOutlined />} />
            <span className="name">
              {withUser.name}
            </span>
          </a>
        </div>
        <div className="message-conversation">
          <ActionCableConsumer
            channel={channelToListen}
            onReceived={this.handleReceived}
            onConnected={this.handleConnect}
          >
            {conversation.messages.map((message, i) => {
              return (
                <Message key={i} message={message.message}></Message>
              );
            })}
          </ActionCableConsumer>
          <div className={isTyping ? "message message-incoming" : "hide"}>
            <Avatar src={withUser.avatar.url} size="small" icon={<UserOutlined />} />
            <div className="message-typing-loader lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
        <div className="message-input">
          <Row>
            <Col span={20}>
              <textarea value={this.state.message} onKeyUp={this.sendIsTyping} onKeyPress={this.handleKeyPress} onChange={this.handleChangeInput} placeholder="Start typing to send a message ..." className="space-input"></textarea>
            </Col>
            <Col span={3}>
              <button onClick={this.send} className="chat-button"><SendOutlined /></button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}