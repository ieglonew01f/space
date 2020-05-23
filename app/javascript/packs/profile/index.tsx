import * as React from 'react';
import { Row, Col, Avatar, Button } from 'antd';
import { HeartTwoTone, EditTwoTone } from '@ant-design/icons';
import { axios } from '../common/constants';
import { PostCard } from '../feeds/post';

import './index.css'
import '../feeds/index.css'

export namespace Profile {
  export interface IProps {

  }

  export interface IState {
    posts: Array<any>;
  }
}

export class Profile extends React.Component<Profile.IProps, Profile.IState> {
  constructor(props: Profile.IProps) {
    super(props);

    this.state = {
      posts: []
    }

    this.load();
  }

  load = () => {
    axios
      .get('/posts')
      .then((response) => {
        this.setState({ posts: response.data })
      })
      .catch((err) => {
        
      });
  }

  render() {
    let currentUser = (window as any).gon.current_user;
    const { posts } = this.state;

    return(
      <div className="center-col profile-container">
        <h3 className="mast">{currentUser.name}</h3>
        <div className="bio">
          <Row>
            <Col span={3}>
              <Avatar size={64} src={currentUser.avatar.url} />
            </Col>
            <Col span={21}>
              <span><b>Bio</b></span>
              <p>{currentUser.bio}</p>
            </Col>
          </Row>
          <span className="stats"><b><HeartTwoTone twoToneColor="#eb2f96" /> 5M Likes</b></span>
          <span className="stats"><b><EditTwoTone  /> 5M Posts</b></span>
        </div>
        <div className="feed-container">
          <div className="news-feed">
            {posts.map((post, i) => {
                return (
                  <PostCard key={i} post={post}></PostCard>
                );
              })}
          </div>
        </div>
      </div>
    )
  }
}