import * as React from 'react';

import { RiseOutlined, FireOutlined, InstagramOutlined, UserOutlined, SettingOutlined, MessageOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { ActionCableConsumer } from 'react-actioncable-provider';

import { CURRENT_USER, notificationSound } from './constants';
import { axios } from '../common/constants';

export namespace SideMenu {
  export interface IProps {

  }

  export interface IState {
    activeTab: string;
    unreadMessages: number;
  }
}

export class SideMenu extends React.Component<SideMenu.IProps, SideMenu.IState> {
  constructor(props: SideMenu.IProps) {
    super(props);

    //populate existing hash
    let hash = window.location.hash;

    this.state = {
      activeTab: hash,
      unreadMessages: 0
    }

    window.addEventListener("hashchange", e => {
      this.setState( { activeTab: window.location.hash })
    });

    this.loadEvents();
  }

  loadEvents = () => {
    axios
    .get('/events')
    .then((response) => {
      let events = response.data.data;

      this.setState({unreadMessages: events.unread_messages})
    })
    .catch((err) => {
      
    });
  }

  componentDidUpdate() {
    this.loadEvents();
  }

  handleReceived = (msg) => {
    // do not play for inbox page
    if (window.location.hash.indexOf('inbox') === -1 && msg.event.unread_messages) {
      notificationSound.play();
      this.setState({
        unreadMessages: msg.event.unread_messages
      });
    }
  }

  render() {
    const { activeTab, unreadMessages } = this.state;
    const channelToListen = {
      channel: "EventChannel",
      user: CURRENT_USER.id
    }

    return(
      <ActionCableConsumer
        channel={channelToListen}
        onReceived={this.handleReceived}
      >
        <div className="side-menu">
          <ul className="list-unstyled">
            <li>
              <a className={activeTab === '#/' ? 'active' : ''} href="#/">
                <FireOutlined /> Hot
              </a>
            </li>
            <li>
              <a className={activeTab === '#/trending' ? 'active' : ''} href="#/trending">
                <RiseOutlined /> Trending
              </a>
            </li>
            <li>
              <a className={activeTab === '#/fresh' ? 'active' : ''} href="#/fresh">
                <InstagramOutlined /> Fresh
              </a>
            </li>
            <li>
              <a className={activeTab.match(/#\/inbox\/.+/g) ? 'active' : ''} href="#/inbox">
                <MessageOutlined /> Inbox
              </a>
              <Badge className="space-badge" count={unreadMessages}/>
            </li>
            <li>
              <a className={activeTab === '#/profile/' + CURRENT_USER.uuid ? 'active' : ''} href={"#/profile/" + CURRENT_USER.uuid}>
                <UserOutlined /> Profile
              </a>
            </li>
            <li>
              <a className={activeTab === '#/settings' ? 'active' : ''} href="#/settings">
                <SettingOutlined /> Settings
              </a>
            </li>
          </ul>
        </div>
      </ActionCableConsumer>
    )
  }
}