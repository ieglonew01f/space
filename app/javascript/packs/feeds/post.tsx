import * as React from 'react';

import { Avatar } from 'antd';
import { UserOutlined, HeartOutlined, DeleteOutlined, QuestionCircleOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Row, Col, Card, Popconfirm} from 'antd';
import {axios, CURRENT_USER } from '../common/constants';
const { Meta } = Card;

export namespace Post {
  export interface IProps {
    post: any;
  }

  export interface IState {
    post: any;
    isCurrentUserPostOwner: boolean;
  }
}
  
export class PostCard extends React.Component<Post.IProps, Post.IState> {
  constructor(props: Post.IProps) {
    super(props);

    const { post } = this.props;

    this.state = {
      post: post,
      isCurrentUserPostOwner: CURRENT_USER.id === post.user.id
    }
  }

  openCard(url: string) {
    window.open(url, '_blank');
  }

  deletePost = () => {
    const { uuid } = this.state.post;

    axios
      .delete('/posts/' + uuid + '.json')
      .then((response) => {

      })
      .catch((err) => {
        
      });
  }

  render() {
    const { post, isCurrentUserPostOwner } = this.state;
    const { name } = post.user;
    let contentMeta = null;

    if (!post.content) {
      return "";
    }

    if (post.content_meta) {
      contentMeta = JSON.parse(post.content_meta);
    }

    return (
      <div className="post-card">
        <Row>
          <Col span={3}>
            <Avatar size={55} src={post.user.avatar.url} icon={<UserOutlined />}/>
          </Col>
          <Col span={21}>
            <div className="header">
              <h4>
                { name }
                <span className="time-ago">
                  <FieldTimeOutlined /> {post.timestamp}
                </span>
              </h4>
              <Popconfirm onConfirm={this.deletePost} className={isCurrentUserPostOwner ? "action-delete" : "hide" } title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                <a href="#"><DeleteOutlined /></a>
              </Popconfirm>
              {/* <span className="stats-mini"><span className="icon"><HeartOutlined/></span> 5M Likes</span>  */}
            </div>
            <div className="content">
              <p>
                {post.content}
              </p>
              <div className={post.image.url ? 'off' : 'hide'}>
                <img width="200" src={post.image && post.image.url}></img>
              </div>

              <div className={contentMeta ? 'preview-url': 'hide'}>
                <Card
                  hoverable
                  onClick={() => this.openCard(contentMeta.url)}
                  cover={<img alt="preview" src={contentMeta && contentMeta.best_image} />}
                >
                  <Meta title={contentMeta && contentMeta.title} description={contentMeta && contentMeta.description} />
                </Card>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}