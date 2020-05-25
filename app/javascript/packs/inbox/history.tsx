import * as React from 'react';

import { ActionCableConsumer } from 'react-actioncable-provider';
import { Avatar } from 'antd';
import { UserOutlined, ClockCircleTwoTone } from '@ant-design/icons';
import { axios } from '../common/constants';

import './index.css'
import { Row, Col } from 'antd';

export namespace History {
  export interface IProps {

  }

  export interface IState {
    conversations: Array<any>
  }
}

export class History extends React.Component<History.IProps, History.IState> {
  constructor(props: History.IProps) {
    super(props);
    this.state = {
      conversations: [],
    }
    this.loadHistory();
  }

  loadHistory = () => {
    axios
      .get('/conversations')
      .then((response) => {
        this.setState({
          conversations: response.data
        })
      })
      .catch((err) => {
        
      });
  }

  render() {
    const { conversations } = this.state;
    return(
      <div className="message-history">
        <div className="header">
          <h3 className="mast">Inbox</h3>
        </div>
        <div className="users">
          <ul className="list-unstyled">
            {conversations.map((conv, i) => {
              return (
                <li key={i}>
                  <a href={"#/inbox/" + conv.user_details.uuid}>
                    <Row>
                      <Col span={3}>
                        <Avatar src={ conv.user_details.avatar.url } icon={<UserOutlined />} />
                      </Col>
                      <Col span={20}>
                        <span className="name">
                          { conv.user_details.name }
                          <small className="date-stamp"><ClockCircleTwoTone /> {conv.timestamp}</small>
                        </span>
                        <p className="last-msg">{conv.latest_message}</p>
                      </Col>
                    </Row>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
  }
}