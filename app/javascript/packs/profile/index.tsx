import * as React from 'react';
import { Row, Col, Avatar, Button } from 'antd';
import { HeartTwoTone, EditTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import { axios, CURRENT_USER } from '../common/constants';
import { Feeds } from '../feeds';

import './index.css'

export namespace Profile {
  export interface IProps {

  }

  export interface IState {
    user: any;
  }
}

export class Profile extends React.Component<Profile.IProps, Profile.IState> {
  constructor(props: Profile.IProps) {
    super(props);
    let hash = window.location.hash.split('/');
    let uuid = hash[hash.length - 1];

    const url = `/users/${uuid}`;

    this.state = {
      user: {
        name: '',
        avatar: {
          url: ''
        },
        bio: ''
      }
    }

    axios
      .get(url)
      .then((response) => {
        this.setState({ user: response.data});
      })
      .catch((err) => {
        
      });
  }

  render() {
    let { user } = this.state;

    return(
      <div className="center-col profile-container">
        <h3 className="mast">{user.name}</h3>
        <div className="bio">
          <Row>
            <Col span={3}>
              <Avatar size={64} src={user.avatar.url} />
            </Col>
            <Col span={21}>
              <span><b>Bio</b></span>
              <p>{user.bio}</p>
            </Col>
          </Row>
          <span className="stats"><b><HeartTwoTone twoToneColor="#eb2f96" /> {user.post_likes} Likes</b></span>
          <span className="stats"><b><EditTwoTone  /> {user.posts_count} Posts</b></span>
          <span className="stats"><b>Joined <ClockCircleTwoTone  /> {user.joined}</b></span>
        </div>
        <Feeds filter="profile"></Feeds>
      </div>
    )
  }
}