import * as React from 'react';

import { ActionCableConsumer } from 'react-actioncable-provider';

import { Editor } from './editor';
import { PostCard } from './post';
import { AUTH_TOKEN, axios } from '../common/constants';

import './index.css'

export namespace Feeds {
  export interface IProps {

  }

  export interface IState {
    posts: Array<any>
  }
}

export class Feeds extends React.Component<Feeds.IProps, Feeds.IState> {
  constructor(props: Feeds.IProps) {
    super(props)
    this.handleReceived = this.handleReceived.bind(this);

    this.state = {
      posts: []
    }

    this.load();
  }

  load = () => {
    axios
      .get('/posts', {
        authenticity_token: AUTH_TOKEN
      })
      .then((response) => {
        this.setState({ posts: response.data })
      })
      .catch((err) => {
        
      });
  }

  handleReceived(resp) {
    let post = JSON.parse(resp.message);
    let { posts } = this.state;
    console.log(post)

    this.setState({ posts: [post, ...posts]})
  }

  render() {
    const { posts } = this.state;
    return(
      <div className="center-col feed-container">
        <h3 className="mast">Trending</h3>
        <Editor></Editor>
        <div className="news-feed">
          <ActionCableConsumer
            channel="NewsFeedChannel"
            onReceived={this.handleReceived}
          >
          {posts.map((post, i) => {
            return (
              <PostCard key={i} post={post}></PostCard>
            );
          })}
          </ActionCableConsumer>
        </div>
      </div>
    )
  }
}