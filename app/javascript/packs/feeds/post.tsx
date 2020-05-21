import * as React from 'react';

import { Avatar } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

export namespace Post {
  export interface IProps {
    post: any;
  }

  export interface IState {
    post: any;
  }
}
  
export class PostCard extends React.Component<Post.IProps, Post.IState> {
  constructor(props: Post.IProps) {
    super(props);

    const { post } = this.props

    this.state = {
      post: post
    }
  }

  render() {
    const { post } = this.state;
    const { name } = post.user;

    return (
      <div className="post-card">
      <Row>
        <Col span={3}><Avatar size={55} src="https://c.wallhere.com/photos/4f/a3/1920x1080_px_blue_eyes_brunette_Miranda_Kerr_model_women-588268.jpg!d" /></Col>
        <h4>{ name } <br/> <span className="stats-mini"><span className="icon"><HeartOutlined/></span> 5M Likes</span></h4>
      </Row>
      <div className="content">
        <p>
          {post.content}
        </p>
      </div>
    </div>
    )
  }
}