import * as React from 'react';

import { Avatar } from 'antd';
import { UserOutlined, HeartTwoTone, HeartOutlined, DeleteOutlined, QuestionCircleOutlined, FieldTimeOutlined } from '@ant-design/icons';
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

  likePost = () => {
    let { post } = this.state;

    if (post.logged_user_like) {
      return;
    }

    post.likes += 1;
    post.logged_user_like = true;

    // increment like
    this.setState({post: post})

    axios
      .post('/posts/like_post', {
        id: post.uuid
      })
      .then((response) => {
        
      })
      .catch((err) => {
        
      });
  }

  deletePost = () => {
    const { uuid } = this.state.post;

    axios
      .delete('/posts/' + uuid)
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
      <div onDoubleClick={this.likePost} className="post-card">
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

              <div className="stats-mini">
                <span onClick={this.likePost} className="icon">
                  <HeartOutlined className={post.logged_user_like ? "hide" : ""}/>
                  <HeartTwoTone className={post.logged_user_like ? "" : "hide"} twoToneColor="#eb2f96" />
                </span> {post.likes} Likes
              </div> 
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}